import { CardContent } from "@/components/ui/card";

interface MultistepFormContentProps {
    children: React.ReactNode;
}

const MultistepFormContent = ({
    children,
} : MultistepFormContentProps) => {
    return (
            <CardContent className="h-[500px] px-0">
                {children}
            </CardContent>
        );
}
 
export default MultistepFormContent;