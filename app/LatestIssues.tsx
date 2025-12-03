import { prisma } from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "./components";
import { Endpoints } from "./Endpoints";
import Link from "next/link";

type Props = {};

export const LatestIssues = async ({}: Props) => {
  const issues = await prisma.issue.findMany({
    orderBy: {
      created_at: "desc",
    },
    take: 5,
    include: {
      assigned_to_user: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between" align="center">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`${Endpoints.ISSUE}${issue.id}`}>
                      {issue.title}
                    </Link>
                    <IssueStatusBadge status={issue.status} />
                  </Flex>
                  {issue.assigned_to_user && (
                    <Avatar
                      src={issue.assigned_to_user.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>{" "}
    </Card>
  );
};

export default LatestIssues;
