import { useState } from 'react'
import { connect } from 'react-redux'
import { newUserPlant } from '../../redux/actions/userActions'

const UserPlantForm = ({ history, newUserPlant, userId }) => {
    const [name, setName] = useState('')
    const [difficulty, setDifficulty] = useState(1)
    const [moisture, setMoisture] = useState(1)
    const [indoor, setIndoor] = useState(false)
    const [photo, setPhoto] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        // need to refector last arguement once get plant species implemented
        newUserPlant({name, difficulty, moisture, indoor, photo, userId, plantId: 1}, history)
    }
    
    return (
        <div className='form-container'>
            <button onClick={()=> history.push(`/greenhouse/${userId}`)}>X</button>
            <h1>Add a Plant to your Garden</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor='name'>name: </label>
                <input id='name' type='text' name='name' placeholder='name' value={name} onChange={(e) => setName(e.target.value)}/>
            <br/>
            <label htmlFor='difficulty'>difficulty: </label>
                <input id='difficulty' type='number' min="1" max="5" name='difficulty' value={difficulty} onChange={(e) => setDifficulty(e.target.value)}/>
            <br/>
            <label htmlFor='moisture'>moisture: </label>
                <input id='moisture' type='number' min="1" max="5" name='moisture' value={moisture} onChange={(e) => setMoisture(e.target.value)}/>
            <br/>
            <label htmlFor='indoor'>indoor: </label>
                <input id='indoor' type='checkbox' name='indoor' checked={indoor} onChange={(e) => setIndoor(e.target.checked)}/>
            <br/>
            <label htmlFor='photo'>photo: </label>
                <input id='photo' type='file' name='photo' onChange={(e) => setPhoto(e.target.files[0])}/>
            <br/>
            <label htmlFor='submit'/>
            <input id='submit' type='submit' />
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.userReducer.id,
    }
}

export default connect(mapStateToProps, { newUserPlant })(UserPlantForm);