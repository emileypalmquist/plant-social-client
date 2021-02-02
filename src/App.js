import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {reAuth} from './redux/actions/userActions'
import Nav from './components/Nav'
import Footer from './components/Footer'
import About from './components/About'
import Login from './components/Login'
import SignUp from './components/SignUp'
import CommunityGarden from './components/CommunityGarden'
import UserPlants from './components/UserPlants'
import './App.css';

const token = localStorage.getItem('token')

class App extends Component {

  componentDidMount() {
    if (token) {
      this.props.reAuth()
    }
  }

  render(){
    const {user, errors} = this.props

    return (
      <div className='app-container'>
        <Router>
          <Nav />
          <div className='app-content'>
            {errors && errors.map(error => <p className='error' key={Math.random}>{error}</p>) }
            <Switch>
              
              <Route exact path='/' component={About} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={SignUp} />
              {!localStorage.getItem('token') && <Redirect to='/login'/>}
              <Route exact path='/community-garden' component={CommunityGarden} />
              <Route path='/greenhouse/:id' component={UserPlants} />
              <Route exact path='/explore' component={CommunityGarden} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        errors: state.statusReducer.errors
    }
}

export default connect(mapStateToProps, {reAuth})(App);
