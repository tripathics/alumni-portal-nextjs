import { SchemaField } from "@/components/forms/SchemaForm/Schema.type";

export const alumniMembershipForm: SchemaField[] = [
  {
    name: "membership_level",
    label: "Membership level",
    type: "select",
    required: "Membership level is required",
    options: [
      {
        value: "level1_networking",
        label: "I am Interested to get information and networking only",
      },
      {
        value: "level2_volunteering",
        label:
          "I am Interested in volunteering for events and activities",
      },
    ],
  },
  {
    name: "sign",
    label: "Signature",
    type: "file",
    required: "Signature is required",
    allowedFormats: ["image/jpeg"],
    maxFileSize: 200 * 1024,
  },
]
