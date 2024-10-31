"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/register-schema";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";
import InputField from "./input-field";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      repeat_password: "",
      role: undefined,
      acceptedToS: false,
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    console.log("submitting");
    startTransition(() => {
      register(values).then((data) => {
        if (data.error) {
          setError(data.error);
        } else if (data.success) {
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="start for free"
      headerDescription="Let's get started with setting up your account."
      headerTitle="Create your account"
      backButtonLabel="Already have an account? Log in."
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-3">
            <div className="flex flex-row items-center gap-x-5 w-full">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="flex gap-x-1">
                      <FormLabel className="font-semibold">
                        First name
                      </FormLabel>
                      <FormLabel className="text-orange-600">*</FormLabel>
                    </div>
                    <InputField
                      field={field}
                      placeholder="John"
                      type="text"
                      isDisabled={isPending}
                      isRequired
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="flex gap-x-1">
                      <FormLabel className="font-semibold">Last name</FormLabel>
                      <FormLabel className="text-orange-600">*</FormLabel>
                    </div>
                    <InputField
                      field={field}
                      placeholder="Doe"
                      type="text"
                      isDisabled={isPending}
                      isRequired
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-x-1">
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormLabel className="text-orange-600">*</FormLabel>
                  </div>
                  <InputField
                    field={field}
                    placeholder="john.doe@example.com"
                    type="email"
                    isDisabled={isPending}
                    isRequired
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-x-1">
                    <FormLabel className="font-semibold">Password</FormLabel>
                    <FormLabel className="text-orange-600">*</FormLabel>
                  </div>
                  <InputField
                    field={field}
                    placeholder="**********"
                    type="password"
                    isDisabled={isPending}
                    isRequired
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeat_password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-x-1">
                    <FormLabel className="font-semibold">
                      Repeat password
                    </FormLabel>
                    <FormLabel className="text-orange-600">*</FormLabel>
                  </div>
                  <InputField
                    field={field}
                    placeholder="**********"
                    type="password"
                    isDisabled={isPending}
                    isRequired
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-x-1">
                  <FormLabel className="font-semibold">I am ...</FormLabel>
                  <FormLabel className="text-orange-600">*</FormLabel>
                </div>
              <RadioGroup 
                required
                onValueChange={field.onChange} 
                value={field.value} 
                disabled={isPending}  
              >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="owner" id="option-one" />
                    <Label htmlFor="option-one">the owner of the hotel.</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employee" id="option-two" />
                    <Label htmlFor="option-two">an employee.</Label>
                  </div>
                </RadioGroup>
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="acceptedToS"
            render={({ field }) => (
              <FormItem>
                <div className="items-top flex space-x-2">
                  <Checkbox id="terms1" 
                    checked={field.value} 
                    onCheckedChange={field.onChange} 
                    disabled={isPending}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <div className="flex gap-x-1">
                    <FormLabel className="font-semibold" htmlFor="terms1">
                      Accept terms and conditions
                    </FormLabel>
                    <FormLabel className="text-orange-600">
                      *
                    </FormLabel>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You agree to our Terms of Service and Privacy Policy.
                    </p>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
