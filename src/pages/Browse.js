
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { useContext } from "react";
import AuthContext from '../helpers/authContext';


function Browse() {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(useContext(AuthContext))
  
  
  
  if (isAuthenticated) {
    //render dashboard page
    return (
      <div>
      <Nav activeIndex='2' />
      <div className='flex flex-row justify-between'>

        <Gallery />
      </div>
      <Footer />
    </div>
    );
  }
  else {
    //render 404
    return (
      <div>
        $ 404 PAGE
      </div>
    )
  }
  
}

export default Browse;
