"use client";

import { guestOptions } from "@/constants/guest-options";
import { ReservationData } from "@/schemas/reservation-data-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import Boilerplate from "@/components/hotel/boilerplate";
import ElementContainer from "@/components/hotel/new-booking/element-container";
import GuestCounter from "@/components/hotel/new-booking/guest-counter";
import PickCalendar from "@/components/hotel/new-booking/pick-calendar";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { FaArrowLeft, FaRegCalendarAlt, FaUserFriends, FaShoppingCart, FaQuestion } from "react-icons/fa";
import { z } from "zod";
import { EXTRA_SERVICES } from "@/constants/extra-services";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input"; // Import your input component
import GuestForm from "@/components/hotel/new-booking/guest-form";


// Infer the form values from the extended schema
type ReservationDataFormValues = z.infer<typeof ReservationData>;

const defaultValues: Partial<ReservationDataFormValues> = {
    date: {
        dateFrom: "",
        dateTo: "",
    },
    guests: {
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0,
    },
    extraServices: [],
    contactInfo: "", // To store either email or phone
    reservationType: "atPlace", // Default reservation type
};

const NewBooking = () => {
    const [range, setRange] = useState<DateRange | undefined>(undefined);
    const [contactMethod, setContactMethod] = useState<"atPlace" | "email" | "phone">("atPlace");
    const [selectedExtraServices, setSelectedExtraServices] = useState<string[]>([]);
    const [currentStep, setCurrentStep] = useState(1); 

    const goToNextStep = () => {
        setCurrentStep(currentStep+1); 
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep-1)
    };

    const router = useRouter();

    const form = useForm<ReservationDataFormValues>({
        resolver: zodResolver(ReservationData),
        defaultValues,
    });

    const generateGuestForms = () => {
        const guests = form.getValues("guests");
        
        const guestComponents = [];
        
        for (const [guestType, count] of Object.entries(guests)) {
            for (let i = 0; i < count; i++) {
                guestComponents.push(
                    <GuestForm key={`${guestType}-${i}`} type={guestType} index={i+1}/>
                );
            }
        }

        return guestComponents;
    };

    const handleExtraServiceChange = (serviceName: string) => {
        setSelectedExtraServices((prev) => {
            const isSelected = prev.includes(serviceName);
            const newSelectedServices = isSelected
                ? prev.filter((name) => name !== serviceName) // Remove if already selected
                : [...prev, serviceName]; // Add if not selected

            form.setValue("extraServices", newSelectedServices); // Update form value
            return newSelectedServices;
        });
    };

    useEffect(() => {
        if (range?.from && range?.to) {
            form.setValue("date.dateFrom", range.from.toISOString().split("T")[0]);
            form.setValue("date.dateTo", range.to.toISOString().split("T")[0]);
        }
    }, [range, form]);

    const returnToOverview = () => {
        router.push("/hotel/booking");
    };

    const submitData = (data: ReservationDataFormValues) => {
        console.log("Form Submitted:");
        console.log(JSON.stringify(data, null, 2));
        // You can add your API call here to send data to your backend
    };

    return (
        <Boilerplate pageName="Booking" showCard>
            <div className="w-full p-3 mb-5">
                <div className="flex flex-row items-center justify-start gap-x-3">
                    <Button variant={"ghost"} onClick={currentStep === 1 ? returnToOverview : goToPreviousStep}>
                        <FaArrowLeft className="hover:bg-none text-black font-light" />
                    </Button>
                    <span className="text-lg font-normal">
                        {currentStep === 1 ? "Choose the booking details" : "Enter guest details"}
                    </span>
                </div>
            </div>

            <Form {...form}>
            <form onSubmit={form.handleSubmit(data => {
                if (currentStep === 1) {
                    goToNextStep(); // Przejdź do następnego kroku
                } else {
                    submitData(data); // Zatwierdź dane
                }
            })}>
                {currentStep === 1 && ( <>
                    <div className="w-full px-10">
                        <div className="flex flex-row justify-between">
                            {/* Date Picker */}
                            <FormField
                                control={form.control}
                                name="date.dateFrom"
                                render={() => (
                                    <FormItem>
                                        <ElementContainer
                                            icon={<FaRegCalendarAlt className="h-7 w-7" />}
                                            name="Date"
                                            description="Checkin - Checkout"
                                        >
                                            <PickCalendar range={range} setRange={setRange} />
                                        </ElementContainer>
                                    </FormItem>
                                )}
                            />

                            {/* Guest Counters */}
                            <FormItem>
                                <ElementContainer
                                    icon={<FaUserFriends className="h-7 w-7" />}
                                    name="Who?"
                                    description="Add the amount of guests."
                                >
                                    <div className="flex flex-col space-y-4">
                                        {guestOptions.map((option) => (
                                            <GuestCounter
                                                key={option.id}
                                                name={option.name}
                                                description={option.description}
                                                value={form.watch(`guests.${option.id}` as const)}
                                                onChange={(value) => form.setValue(`guests.${option.id}` as const, value)}
                                            />
                                        ))}
                                    </div>
                                </ElementContainer>
                            </FormItem>
                        </div>
                    </div>

                    {/* Extra Services Section */}
                    <div className="w-full px-10 mt-4">
                        <div className="flex flex-row justify-between">
                            <ElementContainer
                                icon={<FaShoppingCart className="h-7 w-7" />}
                                name="Extra services"
                                description="Additional services for the reservation"
                            >
                                <ScrollArea className="h-72 w-[500px] rounded-md shadow-lg p-3">
                                    {EXTRA_SERVICES.map((service) => (
                                        <div key={service.id} className="flex items-center mb-2 space-x-3">
                                            <Checkbox
                                                id={service.id}
                                                value={service.name}
                                                onCheckedChange={() => handleExtraServiceChange(service.name)} // Use the new handler
                                                checked={selectedExtraServices.includes(service.name)} // Check if service is selected
                                            />
                                            <label htmlFor={service.id}>
                                                {service.name}
                                            </label>
                                        </div>
                                    ))}
                                </ScrollArea>
                            </ElementContainer>

                            {/* Contact Method Section */}
                            <ElementContainer
                                icon={<FaQuestion className="h-7 w-7" />}
                                name="Type of reservation"
                                description="How was the reservation made?"
                            >
                                <RadioGroup
                                    value={contactMethod}
                                    onValueChange={(value) => {
                                        setContactMethod(value as "atPlace" | "email" | "phone");
                                        form.setValue("reservationType", value as "atPlace" | "email" | "phone"); // Set the reservation type
                                    }}
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="atPlace" id="r1" />
                                        <Label htmlFor="r1">At place</Label>
                                    </div>

                                    {/* Email Option with Input */}
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="email" id="r2" />
                                        <Label htmlFor="r2">Email</Label>
                                        {contactMethod === "email" && (
                                            <FormField
                                                control={form.control}
                                                name="contactInfo"
                                                render={({ field }) => (
                                                    <Input
                                                        type="email"
                                                        placeholder="Enter email"
                                                        {...field}
                                                        required={contactMethod === "email"}
                                                    />
                                                )}
                                            />
                                        )}
                                    </div>

                                    {/* Phone Option with Input */}
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="phone" id="r3" />
                                        <Label htmlFor="r3">Phone</Label>
                                        {contactMethod === "phone" && (
                                            <FormField
                                                control={form.control}
                                                name="contactInfo"
                                                render={({ field }) => (
                                                    <Input
                                                        type="tel"
                                                        placeholder="Enter phone number"
                                                        pattern="[0-9]*"
                                                        {...field}
                                                        required={contactMethod === "phone"}
                                                    />
                                                )}
                                            />
                                        )}
                                    </div>
                                </RadioGroup>
                            </ElementContainer>
                        </div>
                    </div>
                </>)}
                {currentStep === 2 && (
                    <div className="px-10 w-full">
                        <ScrollArea className="w-full h-[700px]">
                            <div className="grid grid-cols-2 gap-10">
                                {generateGuestForms()} {/* Render guest forms dynamically */}
                            </div>
                        </ScrollArea>
                    </div>
                )}

                    {/* Submit Button */}
                    <div className="w-full flex justify-end px-9 py-3">
                        <Button type="submit">
                            {currentStep === 1 ? "Next" : "Submit"}
                        </Button>
                    </div>
                </form>

                {/* Show validation error if date is invalid */}
                {form.formState.errors.date?.dateFrom && (
                    <p className="text-red-500">{form.formState.errors.date.dateFrom.message}</p>
                )}
            </Form>
        </Boilerplate>
    );
};

export default NewBooking;