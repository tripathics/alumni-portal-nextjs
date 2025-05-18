import SchemaForm from "@/components/forms";
import { Button } from "@/components/ui/button";
import updateMessages, { UpdateMessagesProp } from "@/lib/actions/admin/content/updateMessages";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FieldValues } from "react-hook-form";
import useMessages from "@/hooks/queries/useMessages";
import { LoaderCircle } from "lucide-react";
import { SchemaField } from "@/components/forms/SchemaForm/Schema.type";
import { queryKey } from "@/lib/constants/queryKey";
import { toast } from "react-toastify";
import Alert from "@/components/custom-ui/Alert";

const schema: SchemaField[] = [
  {
    name: "full_name",
    type: "text",
    required: "President's name is required",
    label: "President's name"
  },
  {
    name: "email",
    type: "email",
    required: "President's email is required",
    label: "President's email"
  },
  {
    name: "phone",
    type: "text",
    required: "President's phone is required",
    label: "President's phone"
  },
  {
    name: "designation",
    type: "text",
    required: "President's designation is required",
    label: "Designation"
  },
  {
    name: "department",
    type: "text",
    required: "President's department is required",
    label: "Department"
  },
  {
    name: "message",
    type: "textarea",
    required: "President's message is required",
    label: "President's message",
  },
  {
    name: "avatar",
    type: "file",
    required: "A picture of the president is required",
    label: "President's picture",
    allowedFormats: ["image/png", "image/jpeg"],
  }
]

const PresidentsMessageForm: React.FC = () => {
  const queryClient = useQueryClient()
  const messageQuery = useMessages("president")
  const presidentsMessage = messageQuery.data?.messages[0]

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateMessages,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey.messages] })
      toast.success(data?.message || 'Message updated!')
    }
  })

  const handleSubmit = (data: FieldValues) => {
    data.avatar = data.avatar[0]
    mutate({
      ...data as Omit<UpdateMessagesProp, 'message_from'>,
      message_from: "president",
    })
  }

  return messageQuery.isLoading
    ? <LoaderCircle className="animate-spin" />
    : (<div>
      {isError && (
        <Alert severity="error">
          {error.message}
        </Alert>
      )}
      {presidentsMessage ? (
        <SchemaForm
          prefillData={presidentsMessage}
          schema={schema}
          onSubmit={handleSubmit}
          actions={(
            <div className="flex gap-2 *:grow">
              <Button variant="ghost">Cancel</Button>
              <Button loading={isPending} type="submit">Submit</Button>
            </div>
          )}
        />) : (
        <SchemaForm
          schema={schema}
          onSubmit={handleSubmit}
          actions={(
            <div className="flex gap-2 *:grow">
              <Button variant="ghost">Cancel</Button>
              <Button loading={isPending} type="submit">Submit</Button>
            </div>
          )}
        />
      )}
    </div>)
}

export default PresidentsMessageForm;
