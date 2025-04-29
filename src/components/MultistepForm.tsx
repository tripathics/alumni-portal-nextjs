"use client";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

const MultistepForm: React.FC<{
  ref: React.Ref<{ submit: () => void }>;
  forms: {
    comp: React.FC<{
      onSubmit: (formData: FieldValues) => Promise<void>;
      ref: React.Ref<{
        submit: () => void;
      }>;
      data: FieldValues;
    }>;
    onSubmit: (formData: FieldValues) => void;
  }[];
  sharedState: FieldValues;
  setSharedState: React.Dispatch<React.SetStateAction<FieldValues>>;
}> = ({ ref, forms, sharedState, setSharedState }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const changeStep = (direction: "next" | "prev") => {
    setCurrentStep((prev) =>
      direction === "next"
        ? prev + 1 >= forms.length
          ? prev
          : prev + 1
        : prev - 1 < 0
          ? 0
          : prev - 1
    );
  };

  const Form = forms[currentStep].comp;
  const onSubmit = forms[currentStep].onSubmit;

  const handleSubmit = async (data: FieldValues) => {
    try {
      onSubmit(data);
      setSharedState({ ...sharedState, ...data });
      changeStep("next");
    } catch (e) {
      console.error(e);
    }
  };

  return <Form onSubmit={handleSubmit} ref={ref} data={sharedState} />;
};

export default MultistepForm;
