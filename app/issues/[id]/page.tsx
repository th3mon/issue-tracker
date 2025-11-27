import _ from "lodash";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import ReactMarkdown from "react-markdown";

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
    <Box className="max-w-xl">
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.created_at.toDateString()}</Text>
      </Flex>
      <Card className="prose prose-slate prose-headings:text-slate-400 prose-strong:text-slate-500 prose-em:text-slate-400 prose-li:text-slate-400 prose-p:text-slate-300 mt-4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </Box>
  );
};

export default IssueDetailPage;
