"use client";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
    name: string;
    icon: JSX.Element;
    route: string;
}

const poppins = Poppins({
    weight: "500",
    subsets: ["latin"],
})

const SidebarItem = ({
    name,
    icon,
    route
} : SidebarItemProps) => {
    const pathname = usePathname();
    const currentRoute = "/hotel" + route;
    const isActive = pathname.includes(currentRoute);

    return (
        <Link
            href={currentRoute}
        >
            <div 
                className={cn("flex flex-row items-center text-base gap-x-3 rounded-xl py-2 px-4  mx-3", isActive ? "bg-black text-white shadow-lg" : "bg-none text-black hover:bg-black hover:text-white", poppins.className)}
            >
                {icon}
                <span className="font-normal">
                    {name}
                </span>
            </div>
        </Link>
    );
}
 
export default SidebarItem;