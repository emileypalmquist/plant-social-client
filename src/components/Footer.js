import {Link} from 'react-router-dom'
import '../App.css';

const Footer = () => {

    return (
      <footer>
          <Link to='/about'> © Social Garden {new Date().getFullYear()} </Link>
      </footer>
    )
}

export default Footer;