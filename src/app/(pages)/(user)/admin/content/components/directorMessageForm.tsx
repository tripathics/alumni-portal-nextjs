import SchemaForm from "@/components/forms";
import React from "react";

const DirectorsMessageForm: React.FC = () => {
  return (
    <div>
      <SchemaForm schema={[
        {
          name: "director_name",
          type: "text",
          required: "Director's name is required",
          label: "Director's name"
        },
        {
          name: "director_email",
          type: "email",
          required: "Director's email is required",
          label: "Director's email"
        },
        {
          name: "director_phone",
          type: "email",
          required: "Director's email is required",
          label: "Director's email"
        },
        {
          name: "director_message",
          type: "textarea",
          required: "Director's message is required",
          label: "Director's message",
        },
        {
          name: "director_avatar",
          type: "file",
          required: "A picture of the director is required",
          label: "Director's picture",
          allowedFormats: ["image/png", "image/jpeg"],
        }
      ]} onSubmit={(data) => { console.log(data) }} />
    </div>
  )
}

export default DirectorsMessageForm;
