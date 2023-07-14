import { useEffect } from 'react'
import { useParams, } from "react-router-dom";
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { useState } from "react";
import axios from 'axios';
import BookImg from './../images/book.jpg'
import {getBookUrl,getAllBookShelvesUrl,addBookToShelveUrl} from '../common/constants'
import authHeader from '../helpers/authHeader';
import Rating from '../components/Rating';




function SingleBook() {
  let params = useParams()
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShelf,setSelectedShelf] = useState("All")
  const [shelves,setShelves] = useState([])

  useEffect(() => {
    
    Promise.all([getBooks(), getAllBookShelves()]).then((responses) => {
      setBook(responses[0]);
      setShelves(responses[1]);
      setLoading(false);
    })
  },[])
  async function getBooks() {    

    try {
      const responseData = await axios.get(getBookUrl+params.id);
      return responseData.data.data;
      // (responseData.data.data)
      // setLoading(false);
    } catch (error) {

      console.log(error);

    }
  }
  async function getAllBookShelves() {    

    try {
      const responseData = await axios.get(getAllBookShelvesUrl,{headers:authHeader()});
      return responseData.data.data;
      // setShelves(responseData.data.data)
      // console.log("shelves",responseData)
      
    } catch (error) {

      console.log(error);

    }
  }
  async function addBookToShelve() {    

    try {
      const responseData = await axios.patch(`${addBookToShelveUrl}${params.id}/add/${selectedShelf}`,{},{headers:authHeader()});
      console.log("addedBook",responseData);
    } catch (error) {
      console.log(error);
    }
  }
  const handleShleveSelection = (event) =>{
    setSelectedShelf(event.target.value)
  }

  if (loading)
    return (<Loading />)
  else
    return (
      <div>
        <Nav activeIndex='2' />
        <div className='flex flex-row justify-between'>

          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={BookImg} />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">{book.author}</h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{book.title}</h1>

                  <div className="flex mb-4 text-white">

                   
                    <Rating bookId={book._id} rating={book.totalBookRating} />
                  </div>
                  <p className="leading-relaxed text-white">{book.description}</p>
                  <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                    <div className="flex">
                      <span className="mr-3 text-black">Category</span>
                      <p className="mr-3 text-white"> {book.genres[0]}</p>
                    </div>
                    <div className="flex ml-6 items-center">

                    </div>
                  </div>
                  <div className="flex">
                    <select onChange={handleShleveSelection} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      {shelves.map((item, idx)=>(
                        <option key={idx}>{item.name}</option>
                      ))
                        
                      }
                    </select>
                    <button onClick={addBookToShelve} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add</button>

                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>



    );
}

export default SingleBook;
