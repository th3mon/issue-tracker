import { prisma } from "@/prisma/client";
import IssueForm from "../../_components/IssueForm";
import { notFound } from "next/navigation";
import _ from "lodash";

type Props = {
  params: { id: string };
};

const EditIssuePage = async ({ params: { id } }: Props) => {
  if (_.isNaN(Number(id))) {
    notFound();
  }

  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) {
    notFound();
  }

  return <IssueForm issue={issue} />;
};

export async function generateMetadata({ params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: Number(id) } });

  return {
    title: issue?.title,
    description: `Edit details of issue ${issue?.id}`,
  };
}

export default EditIssuePage;
