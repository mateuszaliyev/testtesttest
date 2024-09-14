"use client";

import { Card } from "@/components/ui/card";
import RegisterForm from "./forms/register";
import OrganizationDetails from "./forms/organization-details";
import RoomSetup from "./forms/room-setup";
import MultistepHeader from "./header";
import MultistepNavigation from "./multi-step-navigation";
import { useEffect, useState } from "react";
import MultistepFormContent from "./content";
import { stepStatus } from "@/types/step-status";

const setupSteps = [
  { index: 1, title: "Registration", status: "done" },
  { index: 2, title: "Organization details", status: "current" },
  { index: 3, title: "Room Setup", status: "next" },
];

const MultistepForm = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isDisabled, setIsDisabled] = useState(false);
  const [submit, setSubmit] = useState(false);

  const totalSteps = setupSteps.length;

  const headerStepArray = setupSteps.map((step) => ({
    title: step.title,
    status: step.status as stepStatus,
  }));

  const testForms = [
    <RegisterForm />,
    <OrganizationDetails
      submit={submit}
      onSuccess={handleFormSuccess}
    />,
    <RoomSetup />,
  ];

  function handleFormSuccess(success: boolean) {
    setSubmit(false);
    if (success) goToNextStep();
  }

  function goToPreviousStep() {
    if (currentIndex > 0) {
      setupSteps[currentIndex].status = "next";
      setupSteps[currentIndex - 1].status = "current";
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }

  function goToNextStep() {
    if (currentIndex < totalSteps - 1) {
      setupSteps[currentIndex].status = "done";
      setupSteps[currentIndex + 1].status = "current";
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setupSteps[currentIndex].status = "done";
      submitForm();
    }
  }

  function submitForm() {
    console.log("Submitting!");
    setIsDisabled(true);
  }

  return (
    <Card className="rounded-2xl">
        <MultistepHeader steps={headerStepArray} />
        <MultistepFormContent>{testForms[currentIndex]}</MultistepFormContent>
        <MultistepNavigation
            currentStepIndex={currentIndex}
            goToNextStep={() => setSubmit(true)}
            goToPreviousStep={goToPreviousStep}
            totalSteps={totalSteps}
            isDisabled={isDisabled}
        />
    </Card>
  );
};

export default MultistepForm;
