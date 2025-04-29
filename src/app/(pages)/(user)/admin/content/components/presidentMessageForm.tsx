import SchemaForm from "@/components/forms";
import React from "react";

const PresidentsMessageForm: React.FC = () => {
  return (
    <div>
      <SchemaForm schema={[
        {
          name: "president_name",
          type: "text",
          required: "President's name is required",
          label: "President's name"
        },
        {
          name: "president_email",
          type: "email",
          required: "President's email is required",
          label: "President's email"
        },
        {
          name: "president_phone",
          type: "email",
          required: "President's email is required",
          label: "President's email"
        },
        {
          name: "president_message",
          type: "textarea",
          required: "President's message is required",
          label: "President's message",
        },
        {
          name: "president_avatar",
          type: "file",
          required: "A picture of the president is required",
          label: "President's picture",
          allowedFormats: ["image/png", "image/jpeg"],
        }
      ]} onSubmit={(data) => { console.log(data) }} />
    </div>
  )
}

export default PresidentsMessageForm;
