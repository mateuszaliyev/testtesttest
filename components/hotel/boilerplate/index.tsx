import { getCurrentDate } from "@/hooks/get-current-date";
import Profile from "../profile";
import Notifications from "../profile/notifications";
import { useCurrentUser } from "@/hooks/use-current-user";
import { auth } from "@/auth";

interface BoilerplateProps {
    title: string;
    children: React.ReactNode;
}

const Boilerplate = async ({
    title,
    children,
} : BoilerplateProps ) => {
    
    const date = getCurrentDate();
    const session = await auth();
    const user = session?.user;

    return (
        <div className="p-5 flex flex-col space-y-4 w-full bg-[#F0F0F0]">
            <div className="flex flex-row justify-between w-full">
                <div className="space-y-2 ml-4">
                    <h1 className="text-5xl font-semibold">{title}</h1>
                    <h5 className="text-xl font-light text-[#7A7A7A]"> {date.dayName}, {date.day}.{date.month}.{date.year} </h5>
                </div>
                <div className="flex items-center gap-x-4 m-5">
                    <Notifications />
                    <Profile firstName={user?.firstName || ""} lastName={user?.lastName || ""} role={user?.role || ""}/>
                </div>
            </div>
            <div className="m-5 h-full bg-[#F6F6F6] p-8 rounded-2xl shadow-lg">
                {children}
            </div>
        </div>
    );
}
 
export default Boilerplate;