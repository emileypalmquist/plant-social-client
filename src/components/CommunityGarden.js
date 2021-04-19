import { useEffect } from 'react'
import { connect } from 'react-redux'
import { setPlants } from '../redux/actions/plantActions'

import PlantCard from './userPlants/PlantCard'

const CommunityGarden = ({setPlants, userPlants, history}) => {

  // useEffect(() => {
  //   // setPlants()
  // },[])


  return (
    <>
        <h1>Community Garden</h1>
        <div className='plant-cards-container'>
          {userPlants.map(plant => <PlantCard key={plant.id} userPlant={plant} history={history} />)}
        </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    userPlants: state.plantReducer.userPlants
  }
}

export default connect(mapStateToProps, {setPlants})(CommunityGarden);