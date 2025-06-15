import React from 'react'
import { assets, cities } from '../assets/assets'

const HotelReg = () => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70'>
      <form className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'>
        <img src={assets.regImage} alt="reg-image" className='w-1/2 rounded-xl hidden md:block'/>

        <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
            <img src={assets.closeIcon} alt="close-icon" className='absolute top-4 right-4 h-4 w-4 cursor-pointer'/>
            <p className='text-2xl font-semibold mt-6'>Register Your Hotel</p>
            
            {/* Hotel Name */}
            <div className='w-full mt-4'>
                <label htmlFor="name" className='font-medium text-gray-500'>
                    Hotel Name 
                </label>
                <input id='name' type="text" placeholder='Type Here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
            </div>
            
            {/* Phone */}
            <div className='w-full mt-4'>
                <label htmlFor="contact" className='font-medium text-gray-500'>
                    Phone 
                </label>
                <input id='contact' type="text" placeholder='Type Here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
            </div>

              {/* Address */}
              <div className='w-full mt-4'>
                <label htmlFor="address" className='font-medium text-gray-500'>
                    Address 
                </label>
                <input id='address' type="text" placeholder='Type Here' className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required/>
            </div>

            {/* Select City Drop Down */}
            <div className='w-full mt-4 max-w-60 mr-auto'>
                <label htmlFor="city" className='font-medium text-gray-500'>City</label>
                <select id="city" className='border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light' required>
                    <option value="">Select City</option>
                    {cities.map((city)=>(
                        <option key={{city}} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <button className='bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6'>
                Register
            </button>
        </div>
      </form>
    </div>
  )
}

export default HotelReg
