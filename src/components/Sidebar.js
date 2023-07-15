
import SidebarItem from './SidebarItem'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { getAllBookShelvesUrl } from "../common/constants";
import authHeader from '../helpers/authHeader';


function Sidebar() {
   
   const [newShelfName, setNewShelfName] = useState('')
   const [sidebarItems, setSidebarItems] = useState([
      { name: 'All', href: '/home', current: true }
   ])
   
   useEffect(() => {      
      getAllBookShelves();
    }, []);
    
   async function getAllBookShelves() {    

      try {
        const responseData = await axios.get(getAllBookShelvesUrl,{headers:authHeader()});
        
        const shelves = responseData.data.data;
        
        let sideBarListItems = [];
        shelves.forEach((item) => {
         item.current = false;
         sideBarListItems.push(item);
        })
        setSidebarItems([...sidebarItems,...sideBarListItems]);
      } catch (error) {
  
        console.log(error);
         
      }
    }
   async function createNewShelf() {
      
      try {
          await axios.post(getAllBookShelvesUrl,{
            name:newShelfName
         },
         {headers:authHeader()}
         );  
         setSidebarItems( [...sidebarItems, { name: newShelfName, href: '/home', current: true }])
   
       } catch (error) {
   
         console.log(error);
       }
   }
  
   return (

      <div className=" ">
         <div className="md:relative mx-auto lg:float-right lg:px-6">
            <ul className="list-reset flex flex-row md:flex-col text-center md:text-left">
               {
                  sidebarItems.map((item,id) => (
                     <SidebarItem  name={item.name} current={item.current} id={id} key={id}
                     >
                     </SidebarItem>
                  ))
               }


            </ul>
            <br></br>
            <input onChange={function (e) { setNewShelfName(e.target.value) }}
               label="Add a Bookshelf" type="text" placeholder="Add a bookshelf" name="bookshelf"
               className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            <br></br>
            <button onClick={createNewShelf} type="button" className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
               Add
            </button>

         </div>
      </div>

   );
}

export default Sidebar;
