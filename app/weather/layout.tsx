'use client'

import { BackgroundGradient } from "@/app/components/ui/background-gradient";
import { Metadata } from "next";


const Layout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="max-w-6xl w-11/12 my-5 mx-auto">
            <BackgroundGradient className="overflow-hidden rounded-[22px]  p-4 sm:p-10 bg-zinc-900">{children}</BackgroundGradient>
        </div >
    )
}

export default Layout