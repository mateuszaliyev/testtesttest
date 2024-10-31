interface ElementContainerProps {
    icon: JSX.Element;
    name: string;
    description: string;
    children: React.ReactNode;
}

const ElementContainer = ({
    icon,
    name,
    description,
    children,
} : ElementContainerProps ) => {
    return (
        <div className="flex flex-col w-full space-y-5">
            <div className="flex flex-row gap-x-3 items-center">
                <div className="rounded-full shadow-lg p-3 bg-[#F4F4F4] text-black w-min h-min">
                    {icon}
                </div>
                <div className="flex flex-col">
                    <p className="text-black text-lg font-medium">
                        {name}
                    </p>
                    <span className="text-[#A1A1A1] text-base font-normal">
                        {description}
                    </span>
                </div>
            </div>
            <div className="">
                {children}
            </div>
        </div>
    );
}
 
export default ElementContainer;