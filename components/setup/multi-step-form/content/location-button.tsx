"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LocationButtonProps {
    name: string;
    addFunction: () => void;
    className?: string;
}

const LocationButton = ({
    name,
    addFunction,
    className
} : LocationButtonProps ) => {
    return (
        <Button onClick={addFunction} className={cn("bg-white border border-[#C2C2C2] shadow-md flex text-black  hover:bg-slate-100 w-36 h-36 items-center justify-center gap-x-3 rounded-2xl", className)}>
            <span className="whitespace-break-spaces">{name}</span>
        </Button>
    );
}
 
export default LocationButton;