import { prisma } from "@/prisma/client";
import IssueForm from "../../_components/IssueForm";
import { notFound } from "next/navigation";
import _ from "lodash";
import { cache } from "react";

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } }),
);

type Props = {
  params: { id: string };
};

const EditIssuePage = async ({ params: { id } }: Props) => {
  if (_.isNaN(Number(id))) {
    notFound();
  }

  const issue = await fetchIssue(Number(id));

  if (!issue) {
    notFound();
  }

  return <IssueForm issue={issue} />;
};

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await fetchIssue(Number(id));

  return {
    title: issue?.title,
    description: `Edit details of issue ${issue?.id}`,
  };
}

export default EditIssuePage;
