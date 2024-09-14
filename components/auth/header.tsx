import { cn } from "@/lib/utils";
import { Manrope } from "next/font/google";

const manrope = Manrope({
    subsets: ['latin'],
})

interface HeaderProps {
    label?: string;
    title?: string;
    description?: string;
}

export const Header = ({
    label,
    title,
    description
} : HeaderProps ) => {
    return (
        <div className={cn("w-full flex flex-col gap-y-3 justify-center", manrope.className)}>
            <div className="flex flex-col justify-center">
                <p className="text-base font-semibold text-gray-400 gap-y-2">
                    {label}
                </p>
                <h1 className="text-4xl font-bold text-black">
                    {title}
                </h1>
            </div>
            <p className="text-xl text-gray-500">
                {description}
            </p>
        </div>
    )
}