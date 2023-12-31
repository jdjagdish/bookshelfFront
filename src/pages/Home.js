import { useContext } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Feed from '../components/Feed'
import ErrorPage from '../pages/ErrorPage'
import AuthContext from '../helpers/authContext';
import Cookies from 'universal-cookie'



const cookies = new Cookies();
function Home() {
  const { isAuthenticated } = useContext(AuthContext);
    const loggedUsername = cookies.get('loggedUsername')

  
  //checklogin
  if (isAuthenticated) {
    //render home page
    return (
      <div className="Home">
        <Nav activeIndex='0' />
        <h3>Welcome {loggedUsername}</h3>
        <Feed />
        <Footer />
      </div>
    );
  }
  else {
    //render 404
    return (
      <div>
        <ErrorPage />
      </div>
    )
  }
}

export default Home;
