import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleLogout } from '../redux/actions/userActions'
import '../App.css';

const Nav = ({handleLogout, username, userId}) => {
  
    return (
      <nav>
        {
          !username ?
          (
            <>
              <Link to='/' className='nav-item'> About </Link>
              <Link to='/login' className='nav-item'> Login </Link>
              <Link to='/signup' className='nav-item'> Sign Up </Link>
            </>
          ) : (
            <>
              <Link to={`/greenhouse/${userId}`} className='nav-item'> Your Garden </Link>
              <Link to='/community-garden' className='nav-item'> Community Garden </Link>
              <Link to='/explore' className='nav-item'> Explore </Link>
              <div onClick={handleLogout}><Link to='/' className='nav-item'> Log Out </Link></div>
            </>
          )
        }
      </nav>
    )
}


const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.id,
    username: state.userReducer.username
  }
}

export default connect(mapStateToProps, {handleLogout})(Nav);