import Image from "next/image";
import logo from "@/public/hotel_logo.svg"

const Logo = () => {
    return (
        <div className="flex items-center justify-center py-4">
            <Image alt="HoteLook" src={logo} width={325} height={100}/>
        </div>
    );
}
 
export default Logo;