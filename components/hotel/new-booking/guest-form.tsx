"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaRegGrin } from "react-icons/fa";

interface GuestFormProps {
    type: string; 
    index: number;
}

const GuestForm = ({
    type,
    index
} : GuestFormProps ) => {

    if(type === "adults") type = "Adult"
    else if(type === "children") type = "Child"
    else if(type === "infants") type = "Infant"
    else type = "Pet"

    return (
        <div className="w-full flex flex-col">
            <div className="flex flex-row items-center gap-x-2">
                <div className="rounded-full w-10 h-10 shadow-md flex flex-row items-center justify-center">
                    <FaRegGrin />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-lg text-black">{type} {index}</span>
                    <span className="font-light text-base text-[#C2C2C2]">Enter the data</span>
                </div>
            </div>
            <div className="flex flex-col mt-2">
                <div className="px-2 flex flex-col space-y-3 w-full">
                    <span className="text-lg">FULL NAME</span>
                    <div className="flex flex-row gap-x-4 w-full">
                        <div className="flex flex-col space-y-1 w-full">
                            <Label htmlFor="first_name" className="text-sm">First name</Label>
                            <Input id="first_name"/>
                        </div>
                        <div className="flex flex-col space-y-1 w-full">
                            <Label htmlFor="last_name" className="text-sm">Last name</Label>
                            <Input id="last_name"/>
                        </div>
                    </div>
                    <div className="flex flex-row w-full">
                        <div className="flex flex-col space-y-1 w-full">
                            <Label htmlFor="id_number" className="text-sm">ID Number</Label>
                            <Input id="id_number" className="w-full"/>
                        </div>
                    </div>
                    <div className="flex flex-row gap-x-4 w-full">
                        <div className="flex flex-col space-y-1 w-full">
                            <Label htmlFor="phone" className="text-sm">Phone</Label>
                            <Input id="phone"/>
                        </div>
                        <div className="flex flex-col space-y-1 w-full">
                            <Label htmlFor="email" className="text-sm">Email address</Label>
                            <Input id="email"/>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
}
export default GuestForm;
