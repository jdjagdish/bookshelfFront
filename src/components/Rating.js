import { useState } from "react"
import axios from "axios";
import { rateABookUrl } from "../common/constants";
import authHeader from '../helpers/authHeader';


const Rating = function (props) {
    const [rating, setRating] = useState(props.rating);
    async function patchRating () {
        try {
            const responseData = await axios.patch(rateABookUrl+props.bookId+'/rate/'+rating,{},{headers:authHeader()});
            
            setRating(responseData.data.data)
          } catch (error) {
      
            console.log(error);
      
          }
    }

    return (
        <div className=" rating">
            <p className="ml-6">{rating}</p>
            <div className="flex items-center space-x-1">
            {[...Array(5)].map((star, index) => {
                index++
                return (
                    <svg key={index} rating={rating} onClick={() => { setRating(index);patchRating()}} className={index<=rating ? "w-4 h-4 text-yellow-300 hover:text-gray-300 " : "w-4 h-4 text-gray-300 hover:text-yellow-300 " } aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                )
            })}
            </div>
        </div>
        
    )
}

export default Rating