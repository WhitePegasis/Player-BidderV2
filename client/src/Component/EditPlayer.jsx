import { useState, useEffect } from 'react';

import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getPlayers,  editPlayer } from '../Service/api';

const initialValue = {
    name: '',
    dept: '',
    year: '',
    speciality: '',
    wk: '',
    registered: '',
    soldto: ''
}

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;

const EditPlayer = () => {
    const [player, setUser] = useState(initialValue);
    const { name,dept,year,speciality,wk,registered,soldto } = player;
    const { id } = useParams();
    
    let navigate = useNavigate();

    useEffect(() => {
        loadUserDetails();
    }, []);

    const loadUserDetails = async() => {
        const response = await getPlayers(id);
        setUser(response.data);
    }

    const editPlayerDetails = async() => {
        const response = await editPlayer(id, player);
        navigate('/all');
    }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({...player, [e.target.name]: e.target.value})
    }

    return (
        <Container injectFirst>
            <Typography variant="h4">Edit Information</Typography>
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
                <InputLabel htmlFor="my-input">Registered</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='registered' value={registered} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Sold To</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='soldto' value={soldto} id="my-input"/>
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editPlayerDetails()}>Edit player</Button>
            </FormControl>
        </Container>
    )
}

export default EditPlayer;