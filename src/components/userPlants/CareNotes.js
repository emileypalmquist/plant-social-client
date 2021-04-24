import React, {useState} from "react"
import {api} from "../../services/api"
import {connect} from "react-redux"

const CareNotes = ({userPlantId, careNotes, plantUserId, userId}) => {
    const [content, setContent] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const note = {
            content,
            user_plant_id: userPlantId
        }
        setContent('')
        api.userPlants.createCareNote(note)
            .then(data => console.log(data))
    }

    const displayCareNotes = () => {
        // may want to display created at
        return careNotes.map(cn => <li key={cn.id}>{cn.content}</li>)
    }

    return (
        <div>
            <section>
                <h3>My Care Notes</h3>
                <ul>
                    {displayCareNotes() }
                </ul>
            </section>
            { userId === plantUserId && 
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <input
                        type="submit"
                    />
                </form>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.userReducer.id
    }
}

export default connect(mapStateToProps)(CareNotes);