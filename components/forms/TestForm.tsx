"use client";
import { FieldValues, useForm } from "react-hook-form";
import TextField from "./TextField/TextField";
import NumberField from "./NumberField/NumberField";
import DateField from "./DateField/DateField";
import { Card, CardContent } from "../ui/card";
import Radio from "./Radio/Radio";
import TextareaInput from "./TextareaInput/TextareaInput";
import Select from "./Select/Select";
import { Button } from "../ui/button";

const TestForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            error={errors?.firstName}
            label="First Name"
            type="text"
            value={watch("firstName")}
            {...register("firstName", { required: "This field is required" })}
          />
          <NumberField
            error={errors?.age}
            label="Age"
            value={watch("age")}
            {...register("age", { required: "This field is required" })}
          />
          <DateField
            error={errors?.date}
            label="Date"
            {...register("date", { required: "This field is required" })}
          />
          <Radio
            label="Sex"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
            {...register("sex", { required: "This field is required" })}
          />
          <TextareaInput
            label="Description"
            value={watch("desc")}
            {...register("desc")}
          />
          <Select
            label="Country"
            options={[
              { label: "USA", value: "usa" },
              { label: "Canada", value: "canada" },
              { label: "Mexico", value: "mexico" },
            ]}
            {...register("country", { required: "This field is required" })}
          />
          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TestForm;
