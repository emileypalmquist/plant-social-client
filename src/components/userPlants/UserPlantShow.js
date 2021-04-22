import {useEffect, useState} from  "react";
import {connect} from "react-redux";
import { addErrors, removeErrors } from "../../redux/actions/statusActions";
import {api} from "../../services/api"

const UserPlantShow = ({removeErrors, addErrors, location, match}) => {
    const [showPlant, setPlant] = useState({})

    const handleResponse = (resp) => {
        if (resp.error) {
            addErrors([resp.error])
        } else {
            setPlant(resp)
            removeErrors()
        }
    }

    useEffect(() => {
        if (location.state?.userPlant) {
            setPlant(location.state.userPlant)
            removeErrors()
        } else {
          api.userPlants.getUserPlant(match.params.id).then(resp => handleResponse(resp))
        }
    }, [])

    return (
        <div className="plant-show-container">
            { Object.keys(showPlant).length ? 
            <>
                <img src={`http://localhost:3000${showPlant?.photo}`} alt='user plant' className="plant-image" />
                <h3>{ showPlant?.name }</h3>
                <h3>{ showPlant?.plant?.name }</h3>
                <h6>difficulty: { showPlant?.difficulty }</h6>
                <h6>moisture: { showPlant?.moisture }</h6>
                {showPlant?.indoor ? <h6>indoor</h6> : <h6>outdoor</h6>}
            </>
                :
                <h1>No Plant Found</h1>
            }
        </div>
    )
}

export default connect(null, {addErrors, removeErrors})(UserPlantShow);
