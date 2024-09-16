"use client"

import { cn } from "@/lib/utils";

interface DetailsCheckboxProps {
    title: string;
    className?: string;
    isChecked: boolean; // Add this prop to control checked state externally
    toggleCheckbox: (name: string) => void; // Add this prop to handle checkbox changes
  }
  
  const DetailsCheckbox = ({
    title,
    className,
    isChecked,
    toggleCheckbox, 
  }: DetailsCheckboxProps) => {
    return (
      <div
        className={cn(
          "border border-[#C2C2C2] shadow-md flex flex-col text-black hover:bg-slate-100 w-36 h-36 items-center justify-center gap-x-3 rounded-2xl hover:cursor-pointer p-2 text-center",
          className,
          isChecked ? "bg-slate-100" : "bg-white"
        )}
        onClick={() => toggleCheckbox(title)} 
      >
        <input type="checkbox" checked={isChecked} className="hidden" />
        <span className={cn("text-base break-words", isChecked ? "font-semibold" : "font-normal")}>
          {title}
        </span>
      </div>
    );
  };
  
  export default DetailsCheckbox;
  