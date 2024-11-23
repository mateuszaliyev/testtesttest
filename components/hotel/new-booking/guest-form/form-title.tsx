import { FaPerson, FaChild, FaBaby } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";

interface FormTitleProps {
    type: string;
    index: number;
}

const FormTitle = ({
    type,
    index
} : FormTitleProps) => {

    const iconMap: Record<string, JSX.Element> = {
        adults: <FaPerson className="h-8 w-8" />,
        children: <FaChild className="h-8 w-8" />,
        infants: <FaBaby className="h-8 w-8" />,
        pets: <MdOutlinePets className="h-8 w-8" />,
    };

    const Icon = iconMap[type];

    if (type === "adults") type = "Adult";
    else if (type === "children") type = "Child";
    else if (type === "infants") type = "Infant";
    else if (type === "pets") type = "Pet";

    return (
        <div className="flex flex-row gap-x-4 items-center">
            <div className="rounded-full shadow-xl p-2 flex items-center justify-center">
                {Icon}
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-bold">{type} {index}</span>
                <span className="text-base font-extralight text-gray-500">Enter the data</span>
            </div>
        </div>
    );
}

export default FormTitle;