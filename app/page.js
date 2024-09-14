"use client"
import Image from "next/image"
import ChatBot from "./components/ChatBot";
import { useEffect } from "react";
import ShowComponent from "./components/ShowComponent";

export default function Home() {
  // useEffect(()=>{
  //   const login = async()=>{
  //     const res = await fetch("http://localhost:5000/login", {
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       method: "POST",
  //       body: JSON.stringify({username:"vivek",password: "Vivek@1234"})
  //     })
  //     const data = await res.json()
  //     console.log(data)
  //   }
  //   login()
  // },[])

  return (
    <main className="py-10 sm:px-5 lg:px-20 xl:px-40">
      <ChatBot />
      <div className="banner flex lg:h-[20rem]  flex-col lg:flex-row items-center border">
        <div className="text text-center lg:text-left lg:w-1/2 flex flex-col justify-center  gap-5 p-10">
          <h1 className="font-bold text-4xl">Famous Musuem Tickets & Guided Tours</h1>
          <p>Headout is an authorized and trusted partner of the venue, offering curated experiences to enjoy this attraction. This is not the venue's website.</p>
        </div>
        <div className="image w-1/2 h-full rounded-2xl overflow-hidden">
          <Image  className="h-full w-full object-cover" src={"/images/banner1.avif"}j width={1000} height={1000} alt="musuem image"/>
        </div>
      </div>
      
      <ShowComponent image={"/images/museum.jpeg"}/>
      <ShowComponent image={"/images/museum1.jpeg"}/>
      <ShowComponent image={"/images/museum2.jpeg"}/>
      <ShowComponent image={"/images/museum3.jpeg"}/>

    </main>
  );
}
