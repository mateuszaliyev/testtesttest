"use client"

import { CardFooter } from "@/components/ui/card";
import { IoCheckmarkOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";

interface MultistepNavigationProps {
  totalSteps: number;
  currentStepIndex: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isDisabled: boolean;
}

const MultistepNavigation = ({ 
    totalSteps,
    currentStepIndex, 
    goToNextStep,
    goToPreviousStep,
    isDisabled
} : MultistepNavigationProps) => {
  return (
    <CardFooter className="flex flex-row justify-between items-center w-full">
      <div className="flex flex-row gap-x-2 items-center">
        <div className="bg-[#D7FFE9] text-[#00B051] h-8 w-8 flex justify-center items-center rounded-full">
          <IoCheckmarkOutline />
        </div>
        <span className="font-semibold text-base text-[#898989]">
          Saved 15:23
        </span>
      </div>

      <div className="space-x-3">
        <Button
          onClick={goToPreviousStep}
          type="button"
          disabled={currentStepIndex === 1 || isDisabled}
          className="bg-white text-black hover:bg-slate-50"
        >
          Previous
        </Button>
        <Button 
            type="submit"
            disabled={isDisabled}
            onClick={goToNextStep}    
        >
          Next
        </Button>
      </div>
    </CardFooter>
  );
};

export default MultistepNavigation;
