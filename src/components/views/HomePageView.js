import "../../mainpage.css"

import { Link } from 'react-router-dom';


const HomePageView = () => {
  return (
    <div id="mainpage" >
      <h2>Cuny First Clone</h2>
      <Link to={'/instructors'} className="link" > All Instructors </Link><br></br>
      <Link to={'/courses'} className="link"> All Courses </Link>
      
    </div>
  );    
}




export default HomePageView;
