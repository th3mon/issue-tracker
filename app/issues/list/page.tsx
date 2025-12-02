import { prisma } from "@/prisma/client";
import { Issue } from "@/app/generated/prisma/client";
import { Status } from "@/app/generated/prisma/enums";
import { Table } from "@radix-ui/themes";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { IssueStatusBadge, Link } from "@/app/components";
import { Endpoints } from "@/app/Endpoints";
import IssueActions from "./IssueActions";

type Props = {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
  };
};

type Column = {
  label: string;
  value: keyof Issue;
  className?: string;
};

const getStatus = (status: Status): Status | undefined =>
  Object.values(Status).includes(status) ? status : undefined;

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
  const issues = await prisma.issue.findMany({
    where: { status },
  });

  return (
    <div>
      <IssueActions />

      <Table.Root>
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
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
