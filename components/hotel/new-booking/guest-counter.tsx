"use client"

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

interface GuestCounterProps {
    name: string;
    description: string;
    value: number;
    onChange: (value: number) => void;
}

const GuestCounter = ({
    name,
    description,
    value,
    onChange
} : GuestCounterProps) => {
    return (
        <div className="flex flex-row items-center justify-between w-[400px]">
            <div className="flex flex-col">
                <span className="font-normal text-base text-black">{name}</span>
                <span className="font-normal text-base text-[#A5A5A5]">{description}</span>
            </div>
            <div className="flex flex-row items-center gap-x-3">
                <button 
                    onClick={() => onChange(Math.max(0, value - 1))}
                    type="button"
                    className="rounded-full border-2 border-black p-1"
                >
                    <FaMinus />
                </button>
                <span className="font-normal text-base text-black">
                    {value}
                </span>
                <button 
                    onClick={() => onChange(value + 1)}
                    type="button"
                    className="rounded-full border-2 border-black p-1"
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    );
}
 
export default GuestCounter;