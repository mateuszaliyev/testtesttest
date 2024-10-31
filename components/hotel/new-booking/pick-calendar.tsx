"use client"

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface PickCalendarProps {
    range: DateRange | undefined;
    setRange: (range: DateRange | undefined) => void;
}

const PickCalendar = ({ range, setRange }: PickCalendarProps) => {
    const handleSelect = (newRange: DateRange | undefined) => {
        setRange(newRange);
    };

    //console.log(range?.from);
    //console.log(range?.to);

    return (
        <Calendar
            mode="range"
            selected={range}
            min={2}
            max={31}
            disabled={{ before: new Date() }}
            onSelect={handleSelect}
            className=""
        />
    );
}
 
export default PickCalendar;