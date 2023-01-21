import { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { addTeam } from '../Service/api';
import { useNavigate } from 'react-router-dom';

const initialValue = {
    name: '',
    pointsUsed: 0,
    playerList: [],
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const AddTeam = () => {
    const [team, setTeam] = useState(initialValue);
    const { name} = team;
    const inputLabel =document.getElementById('inputLabel');
    let navigate = useNavigate();

    const onValueChange = (e) => {
        setTeam({...team, [e.target.name]: e.target.value})
    }

    const addTeamDetails = async() => {
        try {
            await addTeam(team);
            alert("Team added successfully!");
            inputLabel.innerHTML='';
        } catch (error) {
            alert("Network error: Couldn't add the team!");
            console.log("Couldn't add team: ", error);
        }
    }

    return (
        <Container>
            <Typography variant="h4">Add Team</Typography>

            <FormControl>
                <InputLabel id='inputLabel' htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" />
            </FormControl>

            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addTeamDetails()}>Add Team</Button>
            </FormControl>
            {/* <Typography variant="h4">Add Team</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" />
            </FormControl>
            
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addTeamDetails()}>Add Team</Button>
            </FormControl> */}
        </Container>
    )
}

export default AddTeam;