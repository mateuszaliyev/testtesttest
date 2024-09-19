import { sidebarItems } from "@/constants/sidebar-items";
import Logo from "../logo";
import { SelectSeparator } from "../ui/select";
import SidebarItem from "./sidebar-item";
import Information from "./information";
import LogoutButton from "./logout-button";

const Sidebar = () => {
    return ( 
        <aside className="h-full flex flex-col min-w-64 bg-[#F6F6F6] justify-between">
            <div>
                <Logo />
                <SelectSeparator />
                <div className="flex flex-col space-y-2">
                    {sidebarItems.map((item) => (
                        <SidebarItem
                            key={item.name}
                            icon={item.icon}
                            name={item.name}
                            route={item.route}
                        />
                    ))}
                </div>
            </div>
            <div className="">
                <LogoutButton />
                <Information />
            </div>
        </aside> 
    );
}
 
export default Sidebar;