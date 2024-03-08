"use client";
import { Button } from "../ui/Moving-border";
import LocationIcon from "@/app/icon/LocationIcon";
import { useRouter } from "next/navigation";



export function MovingBorderDemo() {


  const router = useRouter()


  return (
    <div className="mb-10">

      <Button onClick={() => router.push("/weather")}
        borderRadius="1.75rem"
        className="text-white border-slate-800"
      >
        <LocationIcon />
      </Button>

    </div>
  );

}
