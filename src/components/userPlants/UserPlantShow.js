import {useEffect, useState} from  "react";
import {connect} from "react-redux";
import { addErrors, removeErrors } from "../../redux/actions/statusActions";
import { handleLogout } from "../../redux/actions/userActions";
import {api} from "../../services/api"

const UserPlantShow = (props) => {
    const [showPlant, setPlant] = useState({})

    useEffect(() => {
        if (props.location.state?.userPlant) {
            setPlant(props.location.state.userPlant)
            props.removeErrors()
        } else {
          api.userPlants.getUserPlant(props.match.params.id).then(resp => handleResponse(resp))
        }
    }, [])

    const handleResponse = (resp) => {
        if (resp.error) {
            props.addErrors([resp.error])
        } else {
            showPlant(resp)
            props.removeErrors()
        }
    }

   
    return (
        <div className="plant-show-container">
            <img src={`http://localhost:3000${showPlant?.photo}`} alt='plant image' className="plant-image" />
            <h3>{ showPlant?.name }</h3>
            <h3>{ showPlant?.plant?.name }</h3>
            <h6>difficulty: { showPlant?.difficulty }</h6>
            <h6>moisture: { showPlant?.moisture }</h6>
            {showPlant?.indoor ? <h6>indoor</h6> : <h6>outdoor</h6>}
        </div>
    )
}

export default connect(null, {addErrors, removeErrors})(UserPlantShow);