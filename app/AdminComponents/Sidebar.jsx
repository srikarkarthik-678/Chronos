import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
const Sidebar = () => {
    const router=useRouter()
    const handleRefresh=()=>
    {
        window.location.reload();
    }
    return (
        <div>
            <div className="sidebar w-64 h-[100vh] border border-[#9b6b35]/70 rounded-xl shadow-md max-sm:w-44 max-sm:hidden p-3 ">
                <div className="sidebardetails text-white">
                    <div className="sidebarcontent flex flex-col gap-4  w-[100%]">
                        <div className='flex flex-col items-center justify-center h-[140px]'>
                            <Link href="/"><div className='font-Pop bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 bg-clip-text text-transparent text-3xl mr-3'>
                                Chronos
                            </div></Link>
                            <div className='line h-[2px] border border-gray-700 w-[100%] mt-3'></div>
                            <div className='mt-4'>
                                <div className="bloggerimg  p-2  max-sm:h-[53px] max-sm:pl-8 max-sm:p-3">
                                        <div className='text-lg hover:text-[#ffdf9e] transition-all duration-300 cursor-pointer font-Ciz' onClick={handleRefresh}>
                                            New Chat
                                        </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Sidebar
