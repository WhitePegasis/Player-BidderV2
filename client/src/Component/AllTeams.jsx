import { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Button, styled } from '@mui/material'

import { getTeams } from '../Service/api';

import { Link } from 'react-router-dom';

const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #000000;
        color: #FFFFFF;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;

const AllTeams = () => {
    const [teams, setTeams] = useState([]);
    
    useEffect(() => {
        getAllTeams();
    }, []);

    const getAllTeams = async () => {
        let response = await getTeams();
        //let response = await getEligiblePlayers();
        setTeams(response.data);
        //console.log(players);
    }

    return (
        <StyledTable>
            <TableHead>
                <THead>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Speciality</TableCell>
                    <TableCell>WK</TableCell>
                    <TableCell>Registered</TableCell>
                    <TableCell>Sold To</TableCell>
                </THead>
            </TableHead>
            <TableBody>
                {teams.map((team) => team.teamList.map((player)=> (
                    <TRow key={player.id}>
                        <TableCell>{player._id}</TableCell> {/* change it to user.id to use JSON Server */}
                        <TableCell>{player.name}</TableCell>
                        <TableCell>{player.dept}</TableCell>
                        <TableCell>{player.year}</TableCell>
                        <TableCell>{player.speciality}</TableCell>
                        <TableCell>{player.wk}</TableCell>
                        <TableCell>{player.point}</TableCell>
                        <TableCell>
                            <Button color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/edit/${player._id}`}>Edit</Button> {/* change it to user.id to use JSON Server */}
                            <Button color="secondary" variant="contained" onClick={() => deletePlayerData(player._id)}>Delete</Button> {/* change it to user.id to use JSON Server */}
                        </TableCell>
                    </TRow>
                )))}
            </TableBody>
        </StyledTable>
    )
}

export default AllTeams;