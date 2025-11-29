import { Endpoints } from "@/app/Endpoints";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssueActions = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href={Endpoints.ISSUE_NEW}>New Issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
