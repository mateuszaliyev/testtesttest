import { cn } from "@/lib/utils";
import { stepStatus } from "@/types/step-status";

interface StepTitleProps {
    title: string;
    status: stepStatus;
}

const StepTitle = ({
    title,
    status
} : StepTitleProps) => {
    const defaultStyle = "text-base shrink-0"
    
    switch(status) {
        case "current": 
            return <span className={cn("text-black font-normal", defaultStyle)}>{title}</span>
        case "done": 
            return <span className={cn("text-[#C7C7C7] font-semibold", defaultStyle)}>{title}</span>
        case "next":
            return <span className={cn("text-[#C2C2C2] font-normal", defaultStyle)}>{title}</span>
        

    }
}
 
export default StepTitle;