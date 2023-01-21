import react, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography, MenuItem, Select } from '@mui/material';
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
    let { name,dept,year,speciality,wk,registered,soldto } = player;
    
    let navigate = useNavigate();

    const onValueChange = (e) => {
        setPlayer({...player, [e.target.name]: e.target.value});
        
        console.log(e.target.name);
        ({ name,dept,year,speciality,wk,registered,soldto } = player);
    }

    const addPlayerDetails = async() => {

        if(name.length == 0){
            alert("Name field empty!");
        }
        else if(dept.length == 0){
            alert("Department field empty!");
        }
        else if(year.length == 0){
            alert("Year field empty!");
        }
        else if(speciality.length == 0){
            alert("Speciality field empty!");
        }
        else if(wk.length == 0){
            alert("Wicket Keeper field empty!");
        }
        else{

            try{
                await addPlayer(player);
                alert('Player created successfully!');
                navigate('/all');
            }
            catch(err){
                alert("Network error: Couldn't add the player!");
                console.log("Couldn't add player: ", err);
            }
        }
        
    }

    return (
        <Container>
            <Typography variant="h4">Add Player</Typography>
            <FormControl >
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" />
            </FormControl>
            <FormControl variant='filled'>
                <InputLabel id='deptLabel' >Department</InputLabel>
                <Select
                    labelId="deptLabel"
                    id="deptSelectId"
                    value={dept}
                    onChange={onValueChange}
                    name='dept'
                >
                    <MenuItem value={"CSE"}>CSE</MenuItem>
                    <MenuItem value={"IT"}>IT</MenuItem>
                    <MenuItem value={"CIVIL"}>CIVIL</MenuItem>
                    <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
                    <MenuItem value={"ECE"}>ECE</MenuItem>
                    <MenuItem value={"Electrical"}>Electrical</MenuItem>
                    <MenuItem value={"BBA"}>BBA</MenuItem>
                    <MenuItem value={"BCA"}>BCA</MenuItem>
                </Select>

                {/* <Input onChange={(e) => onValueChange(e)} name='dept' value={dept} id="my-input" /> */}
            </FormControl>
            <FormControl variant='filled'>
                <InputLabel id='yearLabelId'>Year</InputLabel>

                <Select
                    labelId="yearLabel"
                    id="yearSelectId"
                    value={year}
                    onChange={onValueChange}
                    name='year'
                >
                    <MenuItem value={"1"}>1st</MenuItem>
                    <MenuItem value={"2"}>2nd</MenuItem>
                    <MenuItem value={"3"}>3rd</MenuItem>
                    <MenuItem value={"4"}>4th</MenuItem>
                </Select>

                {/* <Input onChange={(e) => onValueChange(e)} name='year' value={year} id="my-input"/> */}
            </FormControl>
            <FormControl variant='filled'>
                <InputLabel id='specialityLabel'>Speciality</InputLabel>

                <Select
                    labelId="specialityLabel"
                    id="specialitySelectId"
                    value={speciality}
                    onChange={onValueChange}
                    name='speciality'
                >
                    <MenuItem value={"Batter"}>Batter</MenuItem>
                    <MenuItem value={"Bowler"}>Bowler</MenuItem>
                    <MenuItem value={"Allrounder"}>Allrounder</MenuItem>
                </Select>
                {/* <Input onChange={(e) => onValueChange(e)} name='speciality' value={speciality} id="my-input" /> */}
            </FormControl>
            <FormControl variant='filled'>
                <InputLabel htmlFor="my-input">Wicket Keeper</InputLabel>
                <Select
                    labelId="wkLabel"
                    id="wkSelectId"
                    value={wk}
                    onChange={onValueChange}
                    name='wk'
                >
                    <MenuItem value={"Yes"}>Yes</MenuItem>
                    <MenuItem value={"No"}>No</MenuItem>
                </Select>
                {/* <Input onChange={(e) => onValueChange(e)} name='wk' value={wk} id="my-input"/> */}
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addPlayerDetails()}>Add player</Button>
            </FormControl>
        </Container>
    )
}

export default AddPlayer;