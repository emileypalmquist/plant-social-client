import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import About from './components/About'
import Login from './components/Login'
import SignUp from './components/SignUp'
import './App.css';

class App extends Component {

  componentDidMount() {
    console.log()
  }

  render(){
    const {user} = this.props
    return (
      <div className='app-container'>
        <Router>
          <Nav />
          <div className='app-content'>
            <Switch>
              <Route exact path='/about' component={About}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/signup' component={SignUp}/>
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
        user: state.userReducer
    }
}

export default connect(mapStateToProps)(App);
