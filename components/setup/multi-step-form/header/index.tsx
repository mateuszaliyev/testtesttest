import { CardHeader } from "@/components/ui/card";
import Step from "./step";

type stepStatus = "done" | "current" | "next";


interface StepProps {
    title: string;
    status: stepStatus;
}

interface MultistepHeaderProps {
    steps: StepProps[];
}

const MultistepHeader = ({
    steps = []
} : MultistepHeaderProps) => {
    const totalSteps = steps.length;
    return ( 
        <CardHeader className="flex flex-row items-center p-10">
            {steps.map((step, index) => (
                <Step
                    key={index}
                    title={step.title}
                    status={step.status}
                    isLast={(index + 1) === totalSteps}
                    index={index + 1}
                />
                ))
            }
        </CardHeader> );
}
 
export default MultistepHeader;