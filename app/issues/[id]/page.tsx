import _ from "lodash";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

type Props = {
  params: {
    id: string;
  };
};

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);

  if (_.isNaN(Number(id))) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Grid
      columns={{
        initial: "1",
        sm: "5",
      }}
      gap="5"
    >
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Flex gap="4" direction="column">
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={id} />
          <DeleteIssueButton issueId={id} />
        </Flex>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: Number(id) } });

  return {
    title: issue?.title,
    description: `Details of issue ${issue?.id}`,
  };
}

export default IssueDetailPage;
