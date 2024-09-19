"use client"

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const PickCalendar = () => {
    const [range, setRange] = useState<DateRange | undefined>(undefined);
    
    const handleSelect = (newRange: DateRange | undefined) => {
        console.log("Selected Range:", newRange);
        setRange(newRange);
    };

    console.log(range?.from);
    console.log(range?.to);

    return (
        <Calendar
            mode="range"
            selected={range}
            min={2}
            max={31}
            disabled={{ before: new Date() }}
            onSelect={handleSelect}
        />
    );
}
 
export default PickCalendar;