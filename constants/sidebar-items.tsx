
import { FaRegCalendarAlt, FaThLarge, FaRegListAlt } from "react-icons/fa";

interface SidebarItemProps {
    name: string;
    icon: JSX.Element;  
    route: string;
}

export const sidebarItems: SidebarItemProps[] = [
    {
        name: "Dashboard",
        icon: <FaThLarge className="w-7 h-7"/>,  
        route: "/dashboard",
    },
    {
        name: "Booking",
        icon: <FaRegCalendarAlt className="w-7 h-7"/>,
        route: "/booking",
    },
    {
        name: "Tasks",
        icon: <FaRegListAlt className="w-7 h-7"/>,
        route: "/tasks",
    }
];
