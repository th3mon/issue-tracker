"use client";

import { useState } from "react";
import { Button, TextField } from "@radix-ui/themes";
import MDEditor from "@uiw/react-md-editor";

type Props = {};

const NewIssuePage = (props: Props) => {
  const [value, setValue] = useState("Description");

  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>

      <MDEditor value={value} onChange={setValue} />

      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
