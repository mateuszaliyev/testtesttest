import { CardContent } from "@/components/ui/card";

interface MultistepFormContentProps {
    children: React.ReactNode;
}

const MultistepFormContent = ({
    children,
} : MultistepFormContentProps) => {
    return (
            <CardContent className="my-8 h-[500px]">
                {children}
            </CardContent>
        );
}
 
export default MultistepFormContent;