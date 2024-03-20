import { BackgroundGradient } from "@/app/components/ui/background-gradient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weather and Forecast",
  description:
    "Get instant, hyperlocal weather updates tailored to your exact location.",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-6xl w-full md:w-11/12 md:my-8  mx-auto">
      <BackgroundGradient className="overflow-hidden rounded-[22px]  p-4 sm:p-10 bg-zinc-900">
        {children}
      </BackgroundGradient>
    </div>
  );
};

export default Layout;
