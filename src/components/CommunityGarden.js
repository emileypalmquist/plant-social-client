import { useEffect } from 'react'
import { connect } from 'react-redux'
import { setPlants } from '../redux/actions/plantActions'

import PlantCard from './PlantCard'

const CommunityGarden = ({setPlants, plants}) => {

  useEffect(() => {
    setPlants()
  },[])


  return (
    <div>
        <h1>Community Garden</h1>
        {plants.map(plant => <PlantCard key={plant.id} plant={plant} />)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    plants: state.plantReducer.plants
  }
}

export default connect(mapStateToProps, {setPlants})(CommunityGarden);