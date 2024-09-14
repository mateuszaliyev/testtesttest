import { cn } from "@/lib/utils";
import { stepStatus } from "@/types/step-status";
import { IoCheckmarkOutline } from "react-icons/io5";

interface PositionIndexProps {
    position: number;
    status: stepStatus;
}
const PositionIndex = ({
    position,
    status
} : PositionIndexProps ) => {

    const defaultStyle = "rounded-full text-base flex flex-row items-center w-8 h-8 justify-center border shrink-0"
    
    switch(status) {
        case "current": 
            return (
                <div className={cn("border-black text-black ", defaultStyle)}>
                    {position}
                </div>
            );
        case "done": 
            return (
                <div className={cn("bg-[#00DA30] border-[#3cff66]", defaultStyle)}>
                    <IoCheckmarkOutline className="text-white" size={24}/>
                </div>
            );
        case "next": 
            return (
                <div className={cn("border-[#C2C2C2] text-[#C2C2C2]", defaultStyle)}>
                    <span className="">{position}</span>
                </div>
            );
    }
}
 
export default PositionIndex;