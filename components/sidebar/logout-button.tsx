"use client"

import { signOut } from "next-auth/react";
import { CiLogout } from "react-icons/ci";

const LogoutButton = () => {

    const logout = async () => {
        await signOut();
    }

    return (
        <button className="flex flex-row bg-white text-red-500 hover:text-red-500/70 items-center gap-x-3 px-4 my-4" onClick={logout}>
            <CiLogout />
            <span className="text-base">Logout</span>
        </button>
    );
}
 
export default LogoutButton;