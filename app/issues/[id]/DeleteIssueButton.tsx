import { Button } from "@radix-ui/themes";

type Props = {
  issueId: string;
};

const DeleteIssueButton = ({ issueId }: Props) => {
  return <Button color="tomato">Delete Issue</Button>;
};

export default DeleteIssueButton;
