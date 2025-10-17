import Image from "next/image";
import Hero from "./Components/Hero";
export default function Home() {
  return (
    <div className="relative h-[100vh]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="/Untitled video - Made with Clipchamp (3).mp4" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute z-30 w-[100%]">
         <Hero/>
      </div>
     
    </div>
  );
}
