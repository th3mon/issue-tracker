import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@/app/generated/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

type Props = {
  issue: Issue;
};

const IssueDetails = ({ issue }: Props) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.created_at.toDateString()}</Text>
      </Flex>
      <Card className="max-w-full prose prose-slate prose-headings:text-slate-400 prose-strong:text-slate-500 prose-em:text-slate-400 prose-li:text-slate-400 prose-p:text-slate-300 mt-4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
