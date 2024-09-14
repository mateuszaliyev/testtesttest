"use client"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
 } from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";
import Image from "next/image";

import Logo from "@/public/logo_small.svg";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    headerTitle?: string;
    headerDescription?: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    headerTitle,
    headerDescription,
    backButtonLabel,
    backButtonHref,
    showSocial
} : CardWrapperProps ) => {
    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader className="flex flex-row items-center">
                <Header label={headerLabel} title={headerTitle} description={headerDescription}/>
                <Image src={Logo} height={80} width={80} alt="Small logo" className="shadow-md"/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    )
}