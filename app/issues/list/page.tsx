import { prisma } from "@/prisma/client";
import { Issue, Status } from "@/app/generated/prisma/client";
import { Flex } from "@radix-ui/themes";
import Pagination from "@/app/components/Pagination";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Metadata } from "next";

type Props = {
  searchParams: IssueQuery;
};

// TODO: Implement ASC and DESC sorting
const IssuesPage = async ({ searchParams }: Props) => {
  const status = getStatus(searchParams.status);
  const where = { status };
  const orderBy = getOrderBy(columnNames, searchParams.orderBy);
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
    <Flex direction="column" gap="5">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={itemCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;

const getStatus = (status: Status): Status | undefined =>
  Object.values(Status).includes(status) ? status : undefined;

type OrderBy = Partial<Record<keyof Issue, "asc" | "desc">>;

const getOrderBy = (
  columnNames: (keyof Issue)[],
  orderBy: keyof Issue,
): OrderBy | undefined =>
  columnNames.includes(orderBy) ? { [orderBy]: "asc" } : undefined;
