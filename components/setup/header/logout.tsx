"use client"

import { MdLogout } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout";
import { signOut } from "next-auth/react";

const LogoutButton = () => {

    const log = () => {
        signOut()
    }

    return (
        <Button onClick={log} className="flex justify-center items-center bg-white text-black rounded-full hover:bg-slate-50 h-16 w-16" type="submit">
            <MdLogout />
        </Button>
    );
}
 
export default LogoutButton;