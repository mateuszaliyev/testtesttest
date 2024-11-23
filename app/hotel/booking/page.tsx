import Boilerplate from "@/components/hotel/boilerplate";
import CreateNewBooking from "@/components/hotel/new-booking/create-new-booking";

const BookingPage = () => {
  return (
    <Boilerplate pageName="Booking">
      <CreateNewBooking />
    </Boilerplate>
  );
}
 
export default BookingPage;