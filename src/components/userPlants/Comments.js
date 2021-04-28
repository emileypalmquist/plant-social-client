import React, {useState} from "react"
import {Comment, Header, Input, Message} from "semantic-ui-react"
import {api} from "../../services/api"
import {connect} from "react-redux"
import {addCommentToUserPlant, removeComment} from "../../redux/actions/plantActions"

const CareNotes = ({userPlantId, comments, userId, addCommentToUserPlant, removeComment}) => {
    const [content, setContent] = useState('')
    const [message, setMessage] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        const comment = {
            content,
            user_plant_id: userPlantId,
            user_id: userId 
        }
        setContent('')
        api.userPlants.createComment(comment)
            .then(data => addCommentToUserPlant(data))
    }

    const formatDate = (date) => {
        let d = new Date(date)
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        return `${mo} ${da}, ${ye}`
    }

    const handleDelete = ({id, user_plant_id}) => {
        api.userPlants.deleteComment(id)
            .then((data) => {
                setMessage(data.message)
                removeComment(id, user_plant_id)
            })
    }

    const displayComments = () => {
        return (
            <>
            {message && <Message onClick={() => setMessage(null)} positive><p>{message}</p></Message>}
            <div id="careNotesSection"> 
                {comments.map(cm => (
                    <Comment  key={cm.id}>
                    {/* need users profile image and name*/}
                    <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                    <Comment.Content>
                    <Comment.Author as='a'>Matt</Comment.Author>
                    <Comment.Metadata>
                        <div>{formatDate(cm.created_at)}</div>
                    </Comment.Metadata>
                    <Comment.Text>{cm.content}</Comment.Text>
                    <Comment.Actions>
                    <Comment.Action onClick={console.log}>Like</Comment.Action>
                        {userId === cm.user_id && <Comment.Action id="delete-note" onClick={() => handleDelete(cm)}>Delete</Comment.Action>}
                    </Comment.Actions>
                    </Comment.Content>
                    </Comment>
                    
            
                ))}
            </div>
            </>
        )
    }

    return (
        <div className="comments">
        <section >
            <Comment.Group >
            <Header as='h3' dividing>
                Comments
            </Header>
                {displayComments() }
            </Comment.Group >
        </section> 
        
            <form onSubmit={handleSubmit} className="care-notes-form">
                <Input fluid icon='arrow circle up' placeholder='comment' value={content} action="" onChange={(e) => setContent(e.target.value)}/>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.userReducer.id
    }
}

export default connect(mapStateToProps, {addCommentToUserPlant, removeComment})(CareNotes);