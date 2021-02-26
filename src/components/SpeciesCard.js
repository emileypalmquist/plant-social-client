const SpeciesCard = ({ plant: { name, scientific_name, trefle_api_id, id } }) => {
    return (
        <div className='plant-card'>
            <img src='' alt='plant image' />
            <h3>{ name }</h3>
            <h6>{ scientific_name }y</h6>
        </div>
    )
}

export default SpeciesCard;