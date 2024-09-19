"use client"

import { CiBellOn } from "react-icons/ci";

const Notifications = () => {
    return (
        <div className="w-14 h-14 rounded-full flex flex-row items-center justify-center bg-white text-black hover:cursor-pointer">
            <CiBellOn />
        </div>
    );
}
 
export default Notifications;