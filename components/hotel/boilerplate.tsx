import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Profile from "./profile";


interface BoilerPlateProps {
    pageName: string;
    showCard?: boolean;
    className?: string;
    children: React.ReactNode;
}

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin", "latin-ext"],
})

const Boilerplate = ({
    pageName,
    showCard = false,
    children,
    className
} : BoilerPlateProps) => {
    return (
        <section className={cn("w-full h-full flex flex-col p-7 space-y-6 bg-[#F0F0F0]", className, poppins.className)}>
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col space-y-1">
                    <p className="font-medium text-5xl">{pageName}</p>
                    <span className="font-light text-2xl text-[#7A7A7A]">Thursday, 05.10.2023</span>
                </div>
                <Profile firstName="Patryk" lastName="Stasik" role="Owner" />
            </div>
            {showCard ? 
                <div className="bg-white rounded-3xl shadow-xl">
                    {children}
                </div>
                : 
                <div className="">
                    {children}
                </div>
            }
        </section>
    );
}
 

export default Boilerplate;