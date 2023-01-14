import Team from '../schema/team-schema.js';




// Save data of the user in database
export const addTeam = async (request, response) => {
    const team = request.body;
    
    const newTeam = new Team(team);
    try{
        await newTeam.save();
        response.status(201).json(newTeam);
    } catch (error){
        response.status(409).json({ message: error.message});     
    } 
}

// // Get all users
export const getTeams = async (request, response) => {
    try{
        const teams = await Team.find();
        response.status(200).json(teams);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

// // Save data of edited user in the database
export const editTeam = async (request, response) => {
    let team = request.body;

    const editTeam = new Team(team);
    try{
        await Team.updateOne({_id: request.params.id}, editTeam);
        response.status(201).json(editTeam);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}


