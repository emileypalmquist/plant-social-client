const UserPlantShow = ({
  userPlant: { name, id, moisture, difficulty, indoor, plant, photo },
}) => {
  return (
    <div>
      <img src={`http://localhost:3000${photo}`} alt="plant image" />
      <h3>{name}</h3>
      <h3>{plant.name}</h3>
      <h6>difficulty: {difficulty}</h6>
      <h6>moisture: {moisture}</h6>
      {indoor ? <h6>indoor</h6> : <h6>outdoor</h6>}
    </div>
  );
};

export default UserPlantShow;
