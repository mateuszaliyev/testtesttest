
interface HotelViewLayoutProps {
    children: React.ReactNode;
}

const HotelViewLayout = ({
    children,
} : HotelViewLayoutProps ) => {
    return (
        <main className="w-full h-full flex flex-row">
            {children}
        </main>
    );
}
 
export default HotelViewLayout;