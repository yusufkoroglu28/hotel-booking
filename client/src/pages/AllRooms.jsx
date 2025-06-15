import React, { useState } from 'react'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating'

const CheckBox = ({label,selected = false,onChange = ()=> {}}) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
      <input type="checkbox" checked={selected} onChange={(e)=>onChange(e.target.checked,label)}/>
      <span className='font-light select-none'>{label}</span>
    </label>
  )
}

const RadioButton = ({label,selected = false,onChange = ()=> {}}) => {
  return (
    <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
      <input type="radio" name='sortOption' checked={selected} onChange={()=>onChange(label)}/>
      <span className='font-light select-none'>{label}</span>
    </label>
  )
}

const AllRooms = () => {

    const navigate = useNavigate();
    const [openFilters,setOpenFilters] = useState(false)
    
    const roomTypes = [
      "Single Bed",
      "Double Bed",
      "Luxury Room",
      "Family Suite",
    ];
    
    const priceRanges = [
      '0 to 500',
      '500 to 1000',
      '1000 to 2000',
      '2000 to 3000',
    ];

    const sortOptions = [
      'Price Low to High',
      'Price High to Low',
      'Newest First',
    ]

  return (
    <div className='flex flex-col-reserve lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
      <div>
        <div className='flex flex-col items-start text-left'>
            <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
            <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, inventore quibusdam laborum quasi ab ratione? Et amet optio corporis nesciunt.</p>
        </div>

        {roomsDummyData.map((room)=>(
            <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last:border-0'>
                <img onClick={()=>{navigate(`/rooms/${room._id}`); scrollTo(0,0)}} src={room.images[0]} alt="hotel-img" title='View Room Details' className='max-h-65 md:1/2 rounded-xl shadow-lg object-cover cursor-pointer'/>
                <div className='md:w-1/2 flex flex-col gap-2'>
                    <p className='text-gray-500'>{room.hotel.city}</p>
                    <p onClick={()=>{navigate(`/rooms/${room._id}`); scrollTo(0,0)}} className='text-gray-800 text-3xl font-playfair cursor-pointer'>{room.hotel.name}</p>
                    <div className='flex items-center'>
                        <StarRating/>
                        <p className='ml-2'>200+ reviews</p>
                    </div>
                    <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                        <img src={assets.locationIcon} alt="location-icon" />
                        <span>{room.hotel.address}</span>
                    </div>
                      {/* Room Amenities */}
                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                      {room.amenities.map((item,index)=>(
                        <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                          <img src={facilityIcons[item]} alt={item} className='w-5 h-5'/>
                          <p className='text-xs'>{item}</p>
                        </div>
                      ))}
                    </div>
                    {/* Room Price Per Night */}
                    <p className='text-xl font-medium text-gray-700'>${room.pricePerNight} /night</p>
                </div>
            </div>
        ))}

      </div>
      {/* Filters */}
      <div className='bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16'>
        <div className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${openFilters && 'border-b'}`}>
          <p className='text-base font-medium text-gray-800'>FILTERS</p>
          <div className='text-xs cursor-pointer'>
            <span onClick={()=>setOpenFilters(!openFilters)} className='lg:hidden'>
              {openFilters ? 'HIDE' : 'SHOW'}</span>
            <span className='hidden lg:block'>CLEAR</span>
          </div>
        </div>

        <div className={`${openFilters ? 'h-auto' : 'h-0 lg:h-auto'} overflow-hidden transition-all duration-700`}>
          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Popular Filters</p>
            {roomTypes.map((room,index)=>(
              <CheckBox key={index} label={room}/>
            ))}
          </div>
          <div className='px-5 pt-5'>
            <p className='font-medium text-gray-800 pb-2'>Price Range</p>
            {priceRanges.map((range,index)=>(
              <CheckBox key={index} label={`$ ${range}`}/>
            ))}
          </div>
          <div className='px-5 pt-5 pb-7'>
            <p className='font-medium text-gray-800 pb-2'>Sort By</p>
            {sortOptions.map((option,index)=>(
              <RadioButton key={index} label={option}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllRooms
