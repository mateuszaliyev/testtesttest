"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import countries from "@/data/countries.json";
import CountryFlag from "./country-flag"
import { OrganizationDetailsSchema } from "@/schemas"

const countryMap = countries.map((country: { code: string; name: string }) => ({
    label: country.name,
    value: country.code.toLowerCase(), 
  }))

const CountrySelectorSchema = z.object({
  hotel_country: z.string({
    required_error: "Please select a country.",
  }),
})

type FormData = z.infer<typeof OrganizationDetailsSchema>;

type UseFormReturnType = ReturnType<typeof useForm<FormData>>;

interface CountrySelectorProps {
  form: UseFormReturnType;
}

export function CountrySelector({form} : CountrySelectorProps) {

  return (
    <FormField
      control={form.control}
      name="hotel_country"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="font-semibold text-black text-lg">Country</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[350px] flex justify-between ",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <div className="flex justify-between items-center z-0 overflow-hidden w-full">
                    <div className="flex gap-x-2 items-center">
                      <CountryFlag 
                        countryCode={countryMap.find((country) => country.label === field.value)?.value || ""} 
                        countryTitle={field.value || ""}
                      />
                      <span className="overflow-hidden">
                        {field.value
                          ? field.value
                          : "Select a country"}
                      </span>
                    </div>
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50 z-10" />
                  </div>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search a country..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    {countryMap.map((country) => (
                      <CommandItem
                        key={country.value}
                        onSelect={() => {
                          form.setValue("hotel_country", country.label)
                        }}
                        className="flex items-center justify-center gap-x-2 text-sm"
                      >
                        <CountryFlag countryCode={country.value} countryTitle={country.label} />
                        {country.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            country.label === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>
            It's the country where your hotel is located in.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />  
  )
}
