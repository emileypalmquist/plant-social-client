import React, {useState} from "react"
import {Comment, Header, Input, Message} from "semantic-ui-react"
import {api} from "../../services/api"
import {connect} from "react-redux"
import {addCareNoteToUserPlant, removeCareNote} from "../../redux/actions/plantActions"



const CareNotes = ({userPlantId, careNotes, plantUserId, userId, addCareNoteToUserPlant, removeCareNote}) => {
    const [content, setContent] = useState('')
    const [message, setMessage] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        const note = {
            content,
            user_plant_id: userPlantId
        }
        setContent('')
        api.userPlants.createCareNote(note)
            .then(data => addCareNoteToUserPlant(data))
    }

    const formatDate = (date) => {
        let d = new Date(date)
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        return `${mo} ${da}, ${ye}`
    }

    const handleDelete = ({id, user_plant_id}) => {
        api.userPlants.deleteCareNote(id)
            .then((data) => {
                setMessage(data.message)
                removeCareNote(id, user_plant_id)
            })
    }

    const displayCareNotes = () => {
        return (
            <>
            {message && <Message onClick={() => setMessage(null)} positive><p>{message}</p></Message>}
        <div id="careNotesSection"> 
            {careNotes.map(cn => (
                <Comment  key={cn.id}>
                <Comment.Content>
                    <Comment.Metadata>
                    <div> {formatDate(cn.created_at)}</div>
                    </Comment.Metadata>
                    <Comment.Text>{cn.content}</Comment.Text>
                    <Comment.Actions>
                    <Comment.Action onClick={console.log}>Like</Comment.Action>
                    {userId === plantUserId && <Comment.Action id="delete-note" onClick={() => handleDelete(cn)}>Delete</Comment.Action>}
                    </Comment.Actions>
                </Comment.Content>
                </Comment>
        
            ))}
        </div>
        </>
        )
    }

    return (
        <div>
        <section >
            <Comment.Group >
            <Header as='h3' dividing>
                My Care Notes
            </Header>
                {displayCareNotes() }
            </Comment.Group >
        </section> 
        
        { userId === plantUserId && 
            <form onSubmit={handleSubmit} className="care-notes-form">
                <Input fluid icon='arrow circle up' placeholder='care note' value={content} action="" onChange={(e) => setContent(e.target.value)}/>
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

export default connect(mapStateToProps, {addCareNoteToUserPlant, removeCareNote})(CareNotes);