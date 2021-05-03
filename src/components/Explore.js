import { useEffect } from 'react'
import { connect } from 'react-redux'
import {api} from '../services/api'
import {setAllPlants} from "../redux/actions/plantActions"


const Explore = ({plants, setAllPlants, history}) => {

  useEffect(() => {
    api.plants.getPlants().then(setAllPlants)
  },[])


  return (
    <>
        <h1 id="title">Explore Plant Species</h1>
        <div className='plant-cards-container'>
          {plants.map(p => (
             <div className="plant-card" key={p.id} onClick={() => history.push(`/plant/${p.id}`)}>
               <img src={p.image_url} alt="plant" className="plant-card-image" />
            
             <section className="plant-card-content">
               <h3 className="user-plant-name">{p.name}</h3>
               <h3 className="plant-name">{p.scientific_name}</h3>
             </section>
           </div>
          ))}
        </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    plants: state.plantReducer.plants
  }
}

export default connect(mapStateToProps, {setAllPlants})(Explore);