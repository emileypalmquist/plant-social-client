import { NavLink } from 'react-router-dom'
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
              <NavLink exact to='/' className='nav-item'> About </NavLink>
              <NavLink to='/login' className='nav-item'> Login </NavLink>
              <NavLink to='/signup' className='nav-item'> Sign Up </NavLink>
            </>
          ) : (
           <>
              <NavLink to={`/greenhouse/${userId}`} className='nav-item'> Your Garden </NavLink>
              <NavLink to='/community-garden' className='nav-item'> Community Garden </NavLink>
              <NavLink to='/explore' className='nav-item'> Explore </NavLink>
              <NavLink to='/login' className='nav-item'> <div onClick={handleLogout}>Log Out </div></NavLink>
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