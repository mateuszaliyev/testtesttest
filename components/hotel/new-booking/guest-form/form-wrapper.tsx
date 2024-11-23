import {Form} from "@/components/ui/form";

interface FormWrapperProps {
    children: React.ReactNode;
}

const FormWrapper = ({ children }: FormWrapperProps) => {
    return (
        <Form {...form}>
            <form>
                {children}
            </form>
        </Form>
    );
}

export default FormWrapper;