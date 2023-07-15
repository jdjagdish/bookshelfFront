import BookImg from './../images/book.jpg'
import Rating from './Rating';
import SectionContext from '../helpers/sectionContext'
import { useContext,useEffect, useState } from 'react';
import { getBookUrl,getAllBookShelvesUrl } from "../common/constants";
import axios from 'axios';
import authHeader from '../helpers/authHeader';

function Table() {
    const { section } = useContext(SectionContext)
    const [books,setBooks] = useState([]);

    async function getAllBooks() {    

        try {
          const responseData = await axios.get(getBookUrl);
          setBooks(responseData.data.data)
        } catch (error) {
          console.log(error);
    
        }
      }

    async function getBooksBySection(section) {
        try {
            const responseData = await axios.get(`${getAllBookShelvesUrl}/${section}`,{headers:authHeader()});
            
            setBooks(responseData.data.data.books)
          } catch (error) {
            console.log(error);
      
          }
    }

    useEffect(() => {
        if (section === "All")
            getAllBooks()
        else
        {
            getBooksBySection(section)
        } 
    }, [section])

    return (

        <div className=" px-4 w-full relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1>{section}</h1>
            <table className=" text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Cover
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Author
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Rating
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Genre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date added
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map((item,i) => (
                            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-32 p-4">
                                    <img src={BookImg} alt="Apple Watch" />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {item.title}
                                </td>
                                <td className="px-6 py-4">
                                    {item.title
                                    }
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    <Rating bookId={item._id} rating={item.rating} />
                                </td>
                                <td className="px-6 py-4">
                                    <p className="font-medium text-red-600 dark:text-red-500 hover:underline">{item.genres[0].name}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="font-medium text-red-600 dark:text-red-500 hover:underline">{item.publishDate}</p>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>

    );
}

export default Table;
