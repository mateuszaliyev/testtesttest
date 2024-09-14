import { ControllerRenderProps } from "react-hook-form";
import { FormControl } from "../ui/form";
import { Input } from "../ui/input";

interface InputFieldProps {
    placeholder?: string;
    isRequired?: boolean;
    type?: string;
    isDisabled?: boolean;
    field: ControllerRenderProps<any, any>;
}

const InputField = ({
    placeholder,
    isRequired = false,
    type = "text",
    isDisabled = false,
    field,
} : InputFieldProps ) => {
    return (
        <FormControl className="">
            <Input
                placeholder={placeholder}
                required={isRequired}
                type={type}
                disabled={isDisabled}
                className="rounded-full p-5"
                {...field}
            />
        </FormControl>
    );
}
 
export default InputField;