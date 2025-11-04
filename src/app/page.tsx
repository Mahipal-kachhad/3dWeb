"use client";
import System from "@/components/solar/System";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <System />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}