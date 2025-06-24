import { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'



const RecommendedHotels = () => {

    const {rooms,searchedCities} = useAppContext();
    const [recommended,setRecommended] = useState([]);


    const filterHotels = () => {
        const filteredHotels = rooms.slice().filter(room => searchedCities.includes(room.hotel.city));
        setRecommended(filteredHotels); 
    }

    useEffect(()=>{
        filterHotels();
    },[rooms,searchedCities])

  return recommended.length > 0 &&(
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20'>


    <Title title='Recommended Hotels' subTitle='Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, architecto aliquam! Deleniti molestiae perspiciatis minus ducimus id doloribus aut consectetur!'/>

      <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
        {recommended.slice(0,4).map((room,index)=>(
            <HotelCard key={room._id} room={room} index={index}/>
            
        ))}
      </div>
    </div>
  )
}

export default RecommendedHotels
