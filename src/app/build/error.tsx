"use client";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import React from "react";

export default function ErrorPage() {
  const router = useRouter();
  return (
    <div className=" w-screen h-screen flex items-center flex-col justify-center">
      <div className="text-2xl text-red-500 font-bold">
        An error occurred while loading the page.
      </div>
      <div className="mt-4 text-gray-600">
        Please try refreshing the page or check back later.
      </div>
      <Button className="mt-6" onClick={() => router.back()}>
        Go Back
      </Button>
    </div>
  );
}
