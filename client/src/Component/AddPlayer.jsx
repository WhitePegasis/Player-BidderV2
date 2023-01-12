import react, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { addPlayer } from '../Service/api';
import { useNavigate } from 'react-router-dom';

const initialValue = {
    name: '',
    dept: '',
    year: '',
    speciality: '',
    wk: '',
    registered: 'No',
    soldto: 'Unsold'
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const AddPlayer = () => {
    const [player, setPlayer] = useState(initialValue);
    const { name,dept,year,speciality,wk,registered,soldto } = player;
    
    let navigate = useNavigate();

    const onValueChange = (e) => {
        setPlayer({...player, [e.target.name]: e.target.value})
    }

    const addPlayerDetails = async() => {
        await addPlayer(player);
        navigate('/all');
    }

    return (
        <Container>
            <Typography variant="h4">Add User</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Department</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='dept' value={dept} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Year</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='year' value={year} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Speciality</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='speciality' value={speciality} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Wicket Keeper</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='wk' value={wk} id="my-input"/>
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addPlayerDetails()}>Add player</Button>
            </FormControl>
        </Container>
    )
}

export default AddPlayer;