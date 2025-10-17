import React from 'react'
import Link from 'next/link'
const Hero = () => {
    return (
        <div>
            <div className="herosection  text-pink-100 font-Pop">
                <div className="herosection">
                    <div className="herodetails flex justify-center items-center h-[100vh]">
                        <div className='flex flex-col justify-center items-center gap-8'>
                            <div className="hackathon text-6xl bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                                Welcome To Chronos
                            </div>
                            <div>
                                <Link href="user/input"><button className='p-2 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-black rounded-full'>Enter World</button></Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
