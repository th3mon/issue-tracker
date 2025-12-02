import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { Status } from "@/app/generated/prisma/enums";
import { IssueStatusBadge, Link } from "@/app/components";
import { Endpoints } from "@/app/Endpoints";
import IssueActions from "./IssueActions";

type Props = {
  searchParams: {
    status: Status;
  };
};

const getStatus = (status: Status): Status | undefined =>
  Object.values(Status).includes(status) ? status : undefined;

const IssuesPage = async ({ searchParams }: Props) => {
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
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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
