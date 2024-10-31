"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { OrganizationDetailsSchema } from "@/schemas/organization-details-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { config } from "dotenv";
import { CountrySelector } from "../content/country-selector";
import { startTransition, useEffect, useState } from "react";
import { setupHotel } from "@/actions/setup-hotel";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { getSession, useSession } from "next-auth/react";
import currentUser from "@/lib/auth";
import { useCurrentUser } from "@/hooks/use-current-user";
import GoogleMap from "../content/google-map";

config({ path: ".env" });


type FormData = z.infer<typeof OrganizationDetailsSchema>;

interface OrganizationDetailsProps {
  submit: boolean;
  onSuccess: (success: boolean) => void;  // New prop
}

const OrganizationDetails = ({ submit, onSuccess }: OrganizationDetailsProps) => {
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isSubmit, setSubmit] = useState(submit);

  const form = useForm<FormData>({
    resolver: zodResolver(OrganizationDetailsSchema),
    defaultValues: {
      hotel_name: "",
      hotel_street: "",
      hotel_city: "",
      hotel_country: "",
      hotel_postal_code: "",
      hotel_house_number: "",
    },
  });


  const { watch, handleSubmit, control } = form;
  const [shouldFetch, setShouldFetch] = useState(false);

  const street = watch("hotel_street");
  const houseNumber = watch("hotel_house_number");
  const city = watch("hotel_city");
  const country = watch("hotel_country");
  const postalCode = watch("hotel_postal_code");

  useEffect(() => {
      if (street && houseNumber && city && country && postalCode) {
        setShouldFetch(true);
      } else {
        setShouldFetch(false);
      }
  }, [street, houseNumber, city, country, postalCode]);

  useEffect(() => {
    if (submit) {
      const formElement = document.getElementById("test");
      if (formElement) {
        (formElement as HTMLFormElement).requestSubmit();
        setSubmit(false);
      }
    }
  }, [submit]);


  const onSubmit = (values: z.infer<typeof OrganizationDetailsSchema>) => {
    setError("");
    setSuccess("");
    console.log("submitting");
    startTransition(() => {
      setupHotel(values, user?.id).then((data) => {
        if (data.error) {
          setError(data.error);
          onSuccess(false);  // Submission failed
        } else if (data.success) {
          setSuccess(data.success);
          onSuccess(true);   // Submission successful
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form 
        id="test"
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-5"
        >
        <div className="flex flex-row mx-20">
          <div>
            <FormField
              control={form.control}
              name="hotel_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-black text-xl">
                    Hotel name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-[350px]"
                      placeholder="Enter the name of your hotel"
                      required
                    />
                  </FormControl>
                  <FormDescription />
                </FormItem>
              )}
            />
            <div className="mt-10 space-y-3">
              <h1 className="font-semibold text-black text-xl">Hotel Adress</h1>
              <div className="flex space-x-7 flex-row">
                <FormField
                  control={form.control}
                  name="hotel_street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-black text-lg">
                        Street
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          required
                          className="w-[350px]"
                          placeholder="Enter the street of the hotel"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hotel_house_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-black text-lg">
                        House number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          required
                          className="w-[200px]"
                          placeholder="Enter the house number "
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex space-x-7 flex-row">
                <FormField
                  control={form.control}
                  name="hotel_city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-black text-lg">
                        City
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          required
                          className="w-[350px]"
                          placeholder="Enter the city name"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hotel_postal_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold text-black text-lg">
                        Postal code
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-[120px]"
                          placeholder="_ _ _ _ _ _ _ _ _"
                          required
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex space-x-7 flex-row">
                <CountrySelector form={form}/>
              </div>
            </div>
          </div>
          <GoogleMap
            street={street}
            city={city}
            country={country}
            houseNumber={houseNumber}
            postalCode={postalCode}
            shouldFetch={shouldFetch}
          />
        </div>
      </form>
    </Form>
  );
};

export default OrganizationDetails;
