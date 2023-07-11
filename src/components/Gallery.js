import { useState, useEffect } from 'react'
import axios from 'axios';
import Book from './Book';
import { getBookUrl } from "../common/constants";


function Table() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks();
  }, [loading, setLoading])
  async function getBooks() {
    

    try {
      const responseData = await axios.get(getBookUrl);
      console.log(responseData.data.data);
      setBooks(responseData.data.data)
      setLoading(false);


    } catch (error) {

      console.log(error);

    }
  }



  if (loading)
    return (<h3>Loading</h3>)
  else
    return (

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">

            {
              books.map((item) => (
                <Book id={item._id} bookName={item.title}
                  authorName={item.author}
                  genre={item.genres[0]}
                  description={item.description}>

                </Book>
              ))
            }


          </div>
        </div>
      </section>

    );
}

export default Table;
