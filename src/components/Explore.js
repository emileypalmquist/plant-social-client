import { useEffect } from 'react'
import { connect } from 'react-redux'



const Explore = ({setPlants, userPlants}) => {

  useEffect(() => {
    console.log('explore')
  },[])


  return (
    <>
        <h1 id="title">Explore Plant Species</h1>
        <div className='plant-cards-container'>
          
        </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    userPlants: state.plantReducer.userPlants
  }
}

export default connect(mapStateToProps)(Explore);