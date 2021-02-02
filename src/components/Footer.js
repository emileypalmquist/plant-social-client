import {Link} from 'react-router-dom'
import '../App.css';

const Footer = () => {

    return (
      <footer>
          <Link to='/'> © Social Garden {new Date().getFullYear()} </Link>
      </footer>
    )
}

export default Footer;