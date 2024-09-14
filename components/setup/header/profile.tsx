"use client"

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutButton from "@/components/setup/header/logout";

interface ProfileProps {
    firstName: string  | undefined;
    lastName: string  | undefined;
    role: string  | undefined;
    className?: string;
}
const Profile = ({
    firstName,
    lastName,
    role,
    className
} : ProfileProps ) => {
    return (
        <div className={cn("flex flex-row gap-x-4 items-center", className)}>
            <LogoutButton />
            <Avatar className="w-24 h-24">
                <AvatarImage  src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full">
                <span className="text-3xl text-black">{firstName} {lastName}</span>
                <span className="text-lg text-gray-500 font-light">{role}</span>    
            </div>
        </div>
    );
}
 
export default Profile;