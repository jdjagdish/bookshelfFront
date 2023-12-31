
import { Link, } from "react-router-dom";
import { useState} from 'react';
import axios from 'axios';
import { signUpUrl } from "../common/constants";

function Register() {

   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [validationMessageEmail, setvalidationMessageEmail] = useState('');
   const [registerMsg, setRegisterMsg] = useState('');
   const [formError, setformError] = useState(false)

   const validateEmail = function () {

      const emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
      if (!emailRegex.test(email)) {
         setvalidationMessageEmail('Email should be something@something.com');

         setformError(true)
      }
      else {
         setformError(false);
         setvalidationMessageEmail('');
      }
      

   }
   
   const handleSubmit = async (e) => {
      e.preventDefault();
      validateEmail();
      //make a call to backend
      if (!formError) {
         signUp();
      }

   }
   const signUp = async () => {
      let data = {
         username: username,
         email: email,
         password: password
      };
      
      try {
         const responseData = await axios.post(signUpUrl, data);
         
         if (responseData.status === 201) {
            setRegisterMsg("Registeration is successful.You can login now");
            setUsername("");
            setPassword("");
            setEmail("")
            
         }
      } catch (error) {
         
         setRegisterMsg(error.response.data.message)
         
      }

   }

   return (


      <div className='flex justify-center '>
         <div className="justify-items-center flex-col max-w-md px-4 py-8 rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
            <div className="self-center mb-2 text-xl font-bold text-white sm:text-2xl ">
               Create a new account
            </div>
            <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
               Already have an account ?
               <button type="button" className="ml-2 py-1 px-4  bg-green-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-30 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                  <Link to="/login">
                     Sign In</Link>
               </button>
            </span>
            <p className='bg-red-300 mt-3 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-red-500 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg'> {validationMessageEmail}</p>
            <p className='bg-red-300 mt-3 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-red-500 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg'>{registerMsg} </p>
            <div className="p-6 mt-0">
               <form action="#">
                  <div className="flex gap-4 mb-2">
                     <div className=" relative ">

                        <div>
                           <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                              Username
                           </label>
                           <div className="relative mt-1 rounded-md shadow-sm">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                 <span className="text-gray-500 sm:text-sm"></span>
                              </div>
                              <input onChange={function (e) { setUsername(e.target.value) }}
                                 label="Username" type="text" placeholder="Username" name="username"
                                 className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col mb-2">
                     <div className=" relative ">

                        <div>
                           <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                              Email
                           </label>
                           <div className="relative mt-1 rounded-md shadow-sm">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                 <span className="text-gray-500 sm:text-sm"></span>
                              </div>
                              <input onChange={function (e) { setEmail(e.target.value) }}
                                 label="Email" type="text" placeholder="Email" name="email"
                                 className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col mb-2">
                     <div className=" relative ">
                        <div>
                           <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                              Password
                           </label>
                           <div className="relative mt-1 rounded-md shadow-sm">
                              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                 <span className="text-gray-500 sm:text-sm"></span>
                              </div>
                              <input onChange={function (e) { setPassword(e.target.value) }}
                                 label="Password" type="password" placeholder="Password" name="password"
                                 className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="flex w-full my-4">
                     <button type="submit" onClick={handleSubmit} className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        Register
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>

   );
}

export default Register;
