import { Link } from "react-router-dom";
import '../index.css';

const Nav = () => {
  // COMPLETE: Add necessary code to display the navigation bar and link between the pages
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link to="/SavedCandidates">Potential Candidates</Link>
    </nav>
  )
};

export default Nav;
