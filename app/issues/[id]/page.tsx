import _ from "lodash";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

type Props = {
  params: {
    id: string;
  };
};

const IssueDetailPage = async ({ params: { id } }: Props) => {
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
      <Flex gap="4" direction="column">
        <EditIssueButton issueId={id} />
        <DeleteIssueButton issueId={id} />
      </Flex>
    </Grid>
  );
};

export default IssueDetailPage;
