"use client"
import { useEffect } from "react";
import Sidebar from "../AdminComponents/Sidebar"
import Footer from "../AdminComponents/Footer";
export default function Layout({ children }) {
    return (
        <>
            <div className="relative h-[100vh]">
                <video id="bgVideo" autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none">
                    <source src="/Untitled video - Made with Clipchamp (3).mp4" type="video/webm" />
                    Your browser does not support the video tag.
                </video>
                <div className="relative flex h-full">
                    <div className="">
                        <Sidebar />
                    </div>
                    <div className="flex flex-col w-[100%]">
                        <div className=" p-6 text-white z-10 h-[90vh]">
                            {children}
                        </div>
                        <div className="line h-[2px] border border-gray-700 w-full">
                            <Footer/>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}