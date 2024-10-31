import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileProps {
    firstName: string;
    lastName: string;
    role: string;
}

const Profile = ({
    firstName,
    lastName,
    role
} : ProfileProps) => {
    return (
        <div className="flex flex-row items-center gap-x-3">
            <Avatar className="w-24 h-24">
                <AvatarImage  
                    src="https://github.com/shadcn.png" 
                    alt="@shadcn" 
                />
                <AvatarFallback>
                    {firstName[0]}{lastName[0]}
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="text-3xl font-medium text-black">{firstName} {lastName}</span>
                <span className="text-xl font-light text-[#7A7A7A]">{role}</span>
            </div>
        </div>
    );
}
 
export default Profile;