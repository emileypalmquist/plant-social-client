import {useEffect, useState} from  "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom"
import {Card, Icon, Image} from "semantic-ui-react"
import { addErrors, removeErrors } from "../../redux/actions/statusActions";
import {setUserPlantShow} from "../../redux/actions/plantActions"
import {api} from "../../services/api"
import CareNotes from "./CareNotes"

const UserPlantShow = ({removeErrors, addErrors, userPlants, showPlant, location, match, setUserPlantShow}) => {
    

    const handleResponse = (resp) => {
        // if (resp.error) {
        //     addErrors([resp.error])
        // } else {
            if (!resp.error) {
                setUserPlantShow(resp)
            }
        //     removeErrors()
        // }
    }

    useEffect(() => {
        const found = userPlants.filter(p => p.id == match.params.id)
     
        if (found.length) {
            setUserPlantShow(found[0])
            // removeErrors()
        } else {
          api.userPlants.getUserPlant(match.params.id).then(resp => handleResponse(resp))
        }
    }, [userPlants])

    return (
        <div className="plant-show-container">
            { Object.keys(showPlant).length ? 
            <>
            <Card>
                <Image src={`http://localhost:3000${showPlant?.photo}`} wrapped ui={false} />
                <Card.Content>
                <Card.Header>{ showPlant?.name }</Card.Header>
                <Card.Meta>
                    <span className='date'>{ showPlant?.plant?.name }</span>
                </Card.Meta>
                <Card.Description>
                    difficulty: { showPlant?.difficulty } <br/>
                    moisture: { showPlant?.moisture } <br/>
                    {showPlant?.indoor ? "indoor" : "outdoor"}
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <Link to={`/greenhouse/${showPlant?.user_id}`}><button>Check out my greenhouse</button></Link><br/>
                    <Icon name='thumbs up outline' />
                    <Icon name='thumbs up' />
                    22 Likes
                </Card.Content>
            </Card>
            <CareNotes careNotes={showPlant?.care_notes} userPlantId={showPlant?.id} plantUserId={showPlant?.user_id}/> 
            </>
                :
                <h1>No Plant Found</h1>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        showPlant: state.plantReducer.userPlantShow,
        userPlants: state.plantReducer.userPlants
    }
}

export default connect(mapStateToProps, {addErrors, removeErrors, setUserPlantShow})(UserPlantShow);
