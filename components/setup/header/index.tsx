import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";
import Profile from "@/components/setup/header/profile";
import { useCurrentUser } from "@/hooks/use-current-user";
import { auth } from "@/auth";

interface HeaderProps {
    firstName: string | undefined;
    lastName: string  | undefined;
    role: string | undefined;
}

const manrope = Manrope({
    subsets: ["latin"],
})

const Header = async () => {
    const session = await auth();
    const user = session?.user;
    
    return ( 
        <header className={cn("w-full flex flex-row py-10 justify-between items-center", manrope.className)}>
            <div className="space-y-2 flex-shrink-0">
                <h1 className="text-4xl font-semibold">Welcome {user?.firstName} {user?.lastName}!</h1>
                <p className="text-xl">This is your first setup of your Hotel. You can change everything later on.</p>
            </div>
            <Profile firstName={user?.firstName} lastName={user?.lastName} role={user?.role} className={cn("flex-shrink-0", manrope.className)}/>
        </header> 
    );
}
 
export default Header;