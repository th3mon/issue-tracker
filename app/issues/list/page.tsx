import { prisma } from "@/prisma/client";
import { Issue } from "@/app/generated/prisma/client";
import { Status } from "@/app/generated/prisma/enums";
import { Box, Table } from "@radix-ui/themes";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { IssueStatusBadge, Link } from "@/app/components";
import { Endpoints } from "@/app/Endpoints";
import IssueActions from "./IssueActions";
import Pagination from "@/app/components/Pagination";

type Props = {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
};

type Column = {
  label: string;
  value: keyof Issue;
  className?: string;
};

const getStatus = (status: Status): Status | undefined =>
  Object.values(Status).includes(status) ? status : undefined;

type OrderBy = Partial<Record<keyof Issue, "asc" | "desc">>;

const getOrderBy = (
  columns: Column[],
  orderBy: keyof Issue,
): OrderBy | undefined =>
  columns.some((column) => column.value === orderBy)
    ? { [orderBy]: "asc" }
    : undefined;

// TODO: Implement ASC and DESC sorting
const IssuesPage = async ({ searchParams }: Props) => {
  const columns: Column[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created",
      value: "created_at",
      className: "hidden md:table-cell",
    },
  ];
  const status = getStatus(searchParams.status);
  const where = { status };
  const orderBy = getOrderBy(columns, searchParams.orderBy);
  const page = Number(searchParams.page) || 1;
  // TODO: Add dropdown to select pageSize
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const itemCount = await prisma.issue.count({ where });

  return (
    <Box>
      <IssueActions />

      <Table.Root mb="5">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link
                  href={Endpoints.ISSUE.replace("${issueId}", String(issue.id))}
                >
                  {issue.title}
                </Link>
                <div className="md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.created_at.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination
        itemCount={itemCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Box>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
