"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema, IssueFormData } from "@/app/validationSchemas";
import { FormErrorText, Spinner } from "@/app/components";
import { Issue } from "@/app/generated/prisma/client";
import { Endpoints } from "@/app/Endpoints";

type Props = {
  issue?: Issue;
};

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);

      if (issue) {
        await axios.patch(Endpoints.API_ISSUES + issue.id, data);
      } else {
        await axios.post(Endpoints.API_ISSUES, data);
      }

      router.push(Endpoints.ISSUES);
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured.");
    }
  });

  return (
    <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
      <TextField.Root>
        <TextField.Input
          placeholder="Title"
          {...register("title")}
          defaultValue={issue?.title}
        />
      </TextField.Root>
      <FormErrorText>{errors.title?.message}</FormErrorText>

      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description ?? ""}
        render={({ field }) => (
          <MDEditor
            textareaProps={{
              placeholder: "Description",
            }}
            {...field}
          />
        )}
      />
      <FormErrorText>{errors.description?.message}</FormErrorText>

      {error && (
        <Callout.Root color="tomato">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <Button disabled={isSubmitting}>
        {issue ? "Update Issue" : "Submit New Issue"}{" "}
        {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default IssueForm;
