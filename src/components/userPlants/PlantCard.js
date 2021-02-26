const PlantCard = ({ userPlant: { name, id, plant, photo }, history}) => {
    return (
        <div className='plant-card' onClick={() => (history.push(`/plant/${id}`))}>
            { photo.includes('https://') ?
                 <img src={photo} alt='plant' className='plant-card-image' /> : 
                <img src={`http://localhost:3000${photo}`} alt='plant' className='plant-card-image' />
            }
            <h3>{ name }</h3>
            <h3>{ plant.name }</h3>
        </div>
    )
}



export default PlantCard;