'use client'

import { BackgroundGradient } from "@/app/components/ui/background-gradient";

const Layout = ({ children }: { children: React.ReactNode }) => {


    //bg-zinc-900 bg color


    return (
        <div className="max-w-7xl w-10/12 mt-20 mx-auto">
            <BackgroundGradient className="overflow-hidden rounded-[22px]  p-4 sm:p-10 bg-zinc-900">{children}</BackgroundGradient>
        </div >
    )
}

export default Layout