"use client"

import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { Poppins } from "next/font/google";
import { FaDoorOpen } from "react-icons/fa";

const poppins = Poppins({
    weight: "500",
    subsets: ["latin"],
})

const LogoutButton = () => {

    const logout = async () => {
        await signOut();
    }

    return (
        <button className={cn("flex flex-row bg-none text-red-500 hover:text-red-500/70 items-center gap-x-3 px-4 my-4 font-bold", poppins.className)} onClick={logout}>
            <FaDoorOpen className="w-6 h-6"/>
            <span className="text-base">Logout</span>
        </button>
    );
}
 
export default LogoutButton;