import SetupWrapper from "@/components/setup/setup-wrapper";

interface SetupLayoutProps {
    children: React.ReactNode;
}
const SetupLayout = ({
    children
} : SetupLayoutProps) => {
    return (
        <SetupWrapper className="bg-[#EBEBEB]">
            {children}
        </SetupWrapper>
    );
}
 
export default SetupLayout;