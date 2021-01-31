import {Link} from 'react-router-dom'
import '../App.css';

const Nav = () => {

    return (
      <nav>
          <Link to='/about' className='nav-item nav-left'> About </Link>
          <Link to='/login' className='nav-item'> Login </Link>
          <Link to='/signup' className='nav-item'> Sign Up </Link>
      </nav>
    )
}

export default Nav;