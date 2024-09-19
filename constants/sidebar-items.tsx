// sidebar-items.ts

import { IoAppsSharp, IoCalendarClearOutline, IoFlagOutline  } from "react-icons/io5";

interface SidebarItemProps {
    name: string;
    icon: JSX.Element;  
    route: string;
}

export const sidebarItems: SidebarItemProps[] = [
    {
        name: "Dashboard",
        icon: <IoAppsSharp />,  
        route: "/dashboard",
    },
    {
        name: "Booking",
        icon: <IoCalendarClearOutline />,
        route: "/booking",
    },
    {
        name: "Tasks",
        icon: <IoFlagOutline />,
        route: "/tasks",
    }
];
