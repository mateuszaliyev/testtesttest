"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
    name: string;
    icon: JSX.Element;
    route: string;
}

const SidebarItem = ({
    name,
    icon,
    route
} : SidebarItemProps) => {
    const pathname = usePathname();
    const currentRoute = "/hotel" + route;
    const isActive = pathname === currentRoute;
    console.log(currentRoute);
    console.log(pathname);
    console.log("Is active", isActive);
    return (
        <Link
            href={currentRoute}
        >
            <div 
                className={cn("flex flex-row items-center text-base gap-x-3 rounded-xl py-2 px-4  font-normal mx-3 ", isActive ? "bg-black text-white shadow-lg" : "bg-none text-black hover:bg-black hover:text-white")}
            >
                {icon}
                <span>
                    {name}
                </span>
            </div>
        </Link>
    );
}
 
export default SidebarItem;