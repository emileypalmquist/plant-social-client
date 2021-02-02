import React, { Component } from 'react'
import { connect } from 'react-redux'
import PlantCard from './PlantCard'

const API = process.env.REACT_APP_BACKEND_BASE_URL

class UserPlants extends Component {
    state = {
        username: null,
        experienceLevel: null,
        zone: null,
        userPlants: [],
        favoritePlantSpecies: [],
        id: null,
        error: null
    }

    componentDidMount() {
        this.handleGetUser()
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id ) {
            this.handleGetUser()
        }
    }

    handleGetUser = () => {
        const { match: { params: { id } }, userId, user } = this.props
        
        if (parseInt(id) !== userId) {
           this.getUserShow(id)
        } else {
            this.setUserState(user)
        }
    }

    

    setUserState = (user) => {
        this.setState({
            ...user, 
            experienceLevel: user.experience_level,
            userPlants: user.user_plants,
            favoritePlantSpecies: user.favorite_plant_species,
            error: null
        })
    }

    getUserShow = (id) => {
        const token = localStorage.token

        fetch(API + '/users/' + id, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    this.setState({error: data.error})
                } else {
                    this.setUserState(data)
                }
            })
            .catch(console.log)
    }

    render() {
        const { userPlants, username, experienceLevel, zone, favoritePlantSpecies, error } = this.state
        
       
        return (
            <div>
                {error ? (
                    <p className='error'>{error}</p>
                ) : (
                    <>
                    <h1> { username }'s Garden </h1>
                    <h6>experience level: {experienceLevel}</h6>
                    <h6>grow zone: {zone}</h6>
                    {userPlants.map(plant => <PlantCard key={plant.id} plant={plant} />)}

                    <h3>{ username }'s favorite species </h3>
                    </>
                )
                }       
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    plants: state.plantReducer.plants,
    userId: state.userReducer.id,
    user: state.userReducer
  }
}

export default connect( mapStateToProps )(UserPlants);