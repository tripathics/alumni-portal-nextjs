"use client";
import { FieldValues, useForm } from "react-hook-form";
import { TextField, Select, Radio, DateField, NumberField } from "..";
import { Button } from "@/components/ui/button";
import Textarea from "../TextareaInput/TextareaInput";
import FileInput from "../FileInput/FileInput";
import { SchemaField } from "./Schema.type";
import FormSectionHeading from "../FormSectionHeading";
import Image from "next/image";
import { Ref, useImperativeHandle } from "react";

interface SchemaFormProps {
  schema: SchemaField[];
  onSubmit: (data: FieldValues) => void;
  actions?: React.ReactNode;
  loading?: boolean;
  prefillData?: FieldValues;
  submitRef?: Ref<{ submit: () => void }>;
}
const SchemaForm: React.FC<SchemaFormProps> = ({
  schema,
  onSubmit,
  actions = null,
  loading = false,
  prefillData,
  submitRef,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: prefillData,
  });

  useImperativeHandle(submitRef, () => ({
    submit: () =>
      new Promise((resolve, reject) => {
        handleSubmit(
          async (data) => {
            try {
              await onSubmit(data);
              resolve(data);
            } catch (error) {
              reject(error);
            }
          },
          (error) => {
            reject(
              new Error("Form validation failed", {
                cause: error,
              })
            );
          }
        )();
      }),
  }));

  if (loading) {
    return <p>Please wait...</p>;
  }

  if (!schema || schema.length === 0 || !onSubmit) {
    return <p>Invalid form</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {schema.map((field, index) => {
        if (
          field.type === "text" ||
          field.type === "email" ||
          field.type === "password"
        ) {
          return (
            <TextField
              key={index}
              type={field.type}
              label={field.label}
              required={!!field.required}
              {...register(field.name, {
                required: field.required,
                pattern: field.pattern,
              })}
              value={watch(field.name)}
              error={errors[field.name]}
              disabled={field.disabled}
              autoComplete={field.autocomplete}
            />
          );
        } else if (field.type === "select") {
          return (
            <Select
              key={index}
              label={field.label}
              required={field.required}
              options={field.options}
              error={errors[field.name]}
              {...register(field.name, { required: field.required })}
              disabled={field.disabled}
            />
          );
        } else if (field.type === "date") {
          return (
            <DateField
              key={index}
              label={field.label}
              {...register(field.name, { required: field.required })}
              required={field.required}
              error={errors[field.name]}
              disabled={field.disabled}
            />
          );
        } else if (field.type === "number") {
          return (
            <NumberField
              key={index}
              label={field.label}
              {...register(field.name, { required: field.required })}
              required={field.required}
              value={watch(field.name)}
              error={errors[field.name]}
              disabled={field.disabled}
            />
          );
        } else if (field.type === "radio") {
          return (
            <Radio
              key={index}
              label={field.label}
              {...register(field.name, { required: field.required })}
              required={field.required}
              options={field.options}
              error={errors[field.name]}
            />
          );
        } else if (field.type === "textarea") {
          return (
            <Textarea
              key={index}
              label={field.label}
              {...register(field.name, { required: field.required })}
              required={field.required}
              error={errors[field.name]}
              value={watch(field.name)}
              disabled={field.disabled}
            />
          );
        } else if (field.type === "file") {
          const file = watch(field.name);

          return (
            <div key={index} className="mt-6 mb-10 first:mt-3">
              {Array.isArray(file) && file.length > 0 && (
                <div className="flex gap-4 w-full flex-wrap mb-4">
                  {file.map((f, _) => (
                    <div
                      style={{
                        maxWidth: field.maxFileSize
                          ? `${field.maxFileSize / 1024}px`
                          : undefined,
                      }}
                      key={_}
                    >
                      <Image
                        width={0}
                        height={0}
                        className="w-full h-auto"
                        src={URL.createObjectURL(f)}
                        alt={f.name}
                      />
                    </div>
                  ))}
                </div>
              )}
              <FileInput
                name={field.name}
                label={field.label}
                control={control}
                watch={watch}
                multiple={!!field?.multiple}
                required={field.required}
                error={errors[field.name]}
                maxFileSize={field.maxFileSize}
                minFileSize={field.minFileSize}
                allowedFormats={field.allowedFormats}
              />
            </div>
          );
        } else if (field.type === "section") {
          return <FormSectionHeading label={field.label} key={index} />;
        } else {
          return <p key={index}>Invalid field</p>;
        }
      })}
      {!submitRef &&
        (actions !== null ? actions : <Button type="submit">Submit</Button>)}
    </form>
  );
};

export default SchemaForm;
