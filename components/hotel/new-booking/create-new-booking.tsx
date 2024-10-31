"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";

const CreateNewBooking = () => {
    const router = useRouter();

    const onButtonPress = () => {
        router.push("/hotel/booking/new");
    }

    return (
        <Button 
            className="flex gap-x-3 shadow-lg"
            onClick={onButtonPress}
        >
            <FaPlus />
            Create new booking
        </Button>
    );
}
 
export default CreateNewBooking;