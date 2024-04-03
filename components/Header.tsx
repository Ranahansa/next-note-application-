import React from 'react'
import { GiNotebook } from 'react-icons/gi';
import { Bitter } from "next/font/google";


const bitter = Bitter({ 
    subsets: ["latin"],
    weight: ["700"],

});
const Header = () => {
    return (
        <div className="w-full py-5 flex justify-center flex-col items-center">
            {/*Container div for the whole section*/}
            <div className="flex flex-col items-center sm:flex-row sm:items-center justify-center">
                {/* Inner div for the main heading */}
                <span className="text-2xl sm:text-4xl font-extrabold uppercase flex items-center">
                    Note Application{" "}
                    <GiNotebook className='w-8 sm:w-10 h-8 sm:h-10 text-red-700 inline-block relative left-2 sm:left-3'/>
                </span>
            </div>
            <span className={`${bitter.className} text-base sm:text-xl pt-2`}>
                {/* Subheading text */}
                <span className='text-red-800'>
                    Boost your productivity</span> - with our user-friendly platform.
                <span/>
            </span>

        </div>
    );
}

export default Header