import Image from 'next/image'
import React from 'react'

function Page() {
    return (
        <div className='min-h-[100svh]'>
            <div className="banner bg-gray-100">
                <h1 className='text-4xl text-center my-3'>About</h1>
                <div className="banner h-[80svh]">
                    <Image className='w-full h-full object-cover' src={"/images/banner.jpeg"} width={1000} height={1000} alt='about image' />
                </div>
                <div className="text py-8">
                    <p className='w-[50%] mx-auto text-base'>We’re a charity caring for the Royal Collection and looking after visitors to the royal palaces. The income from your ticket contributes to the care and conservation of the Royal Collection. Through our work, from exhibitions and learning programmes to publications and retail products, we aim to ensure that the Royal Collection and Palaces are valued and enjoyed by everyone.</p>
                </div>
            </div>
            <div className="collection my-10 w-[80vw] bg-gray-100 m-auto flex">
                <div className="img w-[50%] overflow-hidden">
                    <Image className='w-full h-full object-cover hover:scale-110 transition-transform duration-500' src={"/images/collection.jpeg"} width={1000} height={1000} alt='collection image' />
                </div>
                <div className="text flex flex-col justify-center items-center w-[50%] px-5">
                    <h2 className='text-3xl text-red-900'>About the collection </h2>
                    <div className='text-center text-xl text-gray-600'>Learn more about the royal collection, one of the most important art collection in the world</div>
                </div>
            </div>

            <div className='h-[80svh] border bg-gray-100 px-32 py-10 flex items-center gap-5'>
                <div className="reports w-[50%]  h-[60svh]  self-start rounded-lg  relative">
                    <div className='img w-full h-full overflow-hidden'>
                        <Image className='w-full h-full object-cover rounded-lg hover:scale-110 transition-transform duration-500' src={"/images/report.jpeg"} width={1000} height={1000} alt='report' />
                    </div>
                    <div className="text absolute bottom-[-100px] left-1/2 translate-x-[-50%] w-[80%] z-40 bg-white p-10">
                        <h3 className='text-center text-2xl text-red-800'>Working for us</h3>
                        <div className='text-center'>Find out more about working for Royal Collection Trust, and view our latest vacancies</div>
                    </div>

                </div>
                <div className="working w-[50%]  h-[60svh]  self-end   relative">
                    <div className='img w-full h-full overflow-hidden'>
                        <Image className='w-full h-full object-cover rounded-lg hover:scale-110 transition-transform duration-500' src={"/images/working.jpeg"} width={1000} height={1000} alt='report' />
                    </div>
                    <div className="text absolute top-[-100px] left-1/2 translate-x-[-50%] w-[80%] z-40 bg-white p-10">
                        <h3 className='text-center text-2xl text-red-800'>Annual Reports</h3>
                        <div className='text-center'>Find out more about the activities of Royal Collection Trust in our Annual Reports</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
