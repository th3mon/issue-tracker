import { Endpoints } from "@/app/Endpoints";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

type Props = {
  issueId: string;
};

const EditIssueButton = ({ issueId }: Props) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`${Endpoints.ISSUE_EDIT}${issueId}`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
