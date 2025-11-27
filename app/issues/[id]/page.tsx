import _ from "lodash";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

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
    <div>
      {_.map(issue, (value, key) => (
        <p>
          <strong>{key}</strong>{" "}
          {_.isDate(value) ? value.toDateString() : value}
        </p>
      ))}
    </div>
  );
};

export default IssueDetailPage;
