'use client'

import { BackgroundGradient } from "@/app/components/ui/background-gradient";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-w-7xl w-10/12 mt-40 mx-auto">
            <BackgroundGradient className="rounded-[22px]  p-4 sm:p-10 bg-zinc-900">{children}</BackgroundGradient>
        </div >
    )
}

export default Layout