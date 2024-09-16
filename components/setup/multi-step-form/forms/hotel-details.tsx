import { startTransition, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HotelElement, hotelElements } from "@/constants/hotel-elements";
import DetailsCheckbox from "../content/details-checkbox";
import { setupHotelDetails } from "@/actions/setup-hotel";
import { useCurrentUser } from "@/hooks/use-current-user";

const groupElementsByCategory = (elements: HotelElement[]) => {
  return elements.reduce((acc: { [category: string]: HotelElement[] }, element) => {
    const { category } = element;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(element);
    return acc;
  }, {});
};

const RoomSetup = () => {
  const user = useCurrentUser();
  const groupedElements = groupElementsByCategory(hotelElements);

  const [selectedElements, setSelectedElements] = useState<{ [key: string]: boolean }>(
    hotelElements.reduce((acc, element) => {
      acc[element.name] = false; // Initially, all elements are unchecked (false)
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const toggleCheckbox = (name: string) => {
    setSelectedElements((prevSelectedElements) => ({
      ...prevSelectedElements,
      [name]: !prevSelectedElements[name], // Toggle between true and false
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Selected Elements:", selectedElements);

    console.log("submitting");
    startTransition(() => {
      setupHotelDetails(user?.id, selectedElements).then((data) => {
        console.log("i guess it submitted");
      });
    });
  };

  return (
    <ScrollArea className="w-full h-full border-t-[1px] border-b-[1px] border-[#C2C2C2] p-5">
      <h1 className="text-2xl mb-4 font-semibold">What does your hotel contain? Select the fields!</h1>
      <div className="space-y-4">
        {Object.keys(groupedElements).map((category) => (
          <div key={category}>
            <h2 className="text-xl mb-2 font-semibold">{category}</h2>
            <div className="grid grid-cols-11 gap-4">
              {groupedElements[category].map((hotelElement) => (
                <DetailsCheckbox
                  key={hotelElement.name}
                  title={hotelElement.name}
                  isChecked={selectedElements[hotelElement.name]} 
                  toggleCheckbox={toggleCheckbox} 
                  className="text-base"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Submit
      </button>
    </ScrollArea>
  );
};

export default RoomSetup;
