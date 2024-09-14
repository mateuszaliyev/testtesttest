import { cn } from "@/lib/utils";
import PositionIndex from "./position-index";
import Seperator from "./seperator";
import StepTitle from "./step-title";

type stepStatus = "done" | "current" | "next";

interface StepProps {
    index: number;
    title: string;
    status: stepStatus;
    isLast: boolean;
}

const Step = ({
    index,
    title,
    status,
    isLast,
} : StepProps ) => {
    return (
        <div className={cn("flex items-center gap-x-2", isLast ? "w-0" : "w-[800px]")}>
            <PositionIndex 
                position={index}
                status={status}
            />
            <StepTitle status={status} title={title} />
            {!isLast && <Seperator />}
        </div>
    );
}
 
export default Step;