import React, { useState } from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddRoom = () => {

   const {axios, getToken} = useAppContext()

   const [images,setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
   })

   const [inputs,setInputs] = useState({
    roomType:'',
    pricePerNight: 0,
    amenities: {
      'Free Wifi':false,
      'Free Breakfast':false,
      'Room Service':false,
      'Mountain View':false,
      'Pool Access':false
    }
   })

   const [loading,setLoading] = useState(false)

   const onSubmitHandler = async (e) =>{
    e.preventDefault()
    //Check if all inputs are filled
    if (!inputs.roomType || inputs.pricePerNight || inputs.amenities || !Object.values(images).some(image => image)) {
      toast.error('Please fill in all the details')
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData()
      formData.append('roomType',inputs.roomType)
      formData.append('pricePerNight',inputs.pricePerNight)
      //Converting amenities to array & keeping only enabled amenities
      const amenities = Object.keys(inputs.amenities).filter(key => inputs.amenities[key])
      formData.append('amenities',JSON.stringify(amenities))

      //adding images to formdata
      Object.keys(images).forEach((key)=>{
        images[key] && formData.append('images',images[key])
      })

      const {data} = await axios.post('/api/rooms/',formData,{headers:{Authorization:`Bearer ${await getToken()}`}})
      if (data.success) {
        toast.success(data.message)
        setInputs({
          roomType:'',
          pricePerNight:0,
          amenities:{
            'Free Wifi':false,
            'Free Breakfast':false,
            'Room Service':false,
            'Mountain View':false,
            'Pool Access':false,
          }
        })
        setImages({1:null,2:null,3:null,4:null})
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false);
    }
   }

  return (
    <form onSubmit={onSubmitHandler}>
      <Title align='left' font='outfit' title='Add Room' subTitle='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus cumque nihil, velit laboriosam quis vero alias ducimus similique maxime tempora.'/>

      {/* Upload Area For Images */}
      <p className='text-gray-800 mt-10'>Images</p>
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key)=>(
          <label htmlFor={`roomImage${key}`} key={key}>
            <img className='max-h-13 cursor-pointer opacity-80' src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadArea} alt="" />
            <input type="file" accept='image/*' id={`roomImage${key}`} hidden onChange={e=>setImages({...images,[key]:e.target.files[0]})}/>
          </label>
        ))}
      </div>

      <div className='w-full flex max-sm:flex-col sm:gap-4 mt-4'>
        <div className='flex-1 max-w-48'>
          <p className='text-gray-800 mt-4'>Room Type</p>
          <select value={inputs.roomType} onChange={e=>setInputs({...inputs,roomType:e.target.value})} className='border opacity-70 border-gray-300 mt-1 rounded p-2 w-full'>
            <option value="">Select Room Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Luxury Room">Luxury Room</option>
            <option value="Family Suite">Family Suite</option>
          </select>
        </div>
        <div>
          <p className='mt-4 text-gray-800'>
            Price <span className='text-xs'>/night</span>
          </p>
          <input type="number" placeholder='0' className='border border-gray-300 mt-1 rounded p-2 w-24' value={inputs.pricePerNight} onChange={e=>setInputs({...inputs,pricePerNight:e.target.value})}/>
        </div>
      </div>

       <p className='text-gray-800 mt-4'>Amenities</p>
       <div className='flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm'>
          {Object.keys(inputs.amenities).map((amenity,index)=>(
            <div key={index}>
              <input type="checkbox" id={`amenities${index+1}`} checked={inputs.amenities[amenity]} onChange={()=>setInputs({...inputs,amenities:{...inputs.amenities,[amenity]:!inputs.amenities[amenity]}})}/>
              <label htmlFor={`amenities${index+1}`}>{amenity}</label>
            </div>
          ))}
       </div>
       <button className='bg-primary text-white px-8 py-2 rounded mt-8 cursor-pointer' disabled={loading}>
        {loading ? 'Adding...' :  'Add Room'}
       </button>
    </form>
  )
}

export default AddRoom
