import react, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, styled } from '@mui/material'
import { getPlayers, deletePlayer } from '../Service/api';
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

const AllPlayers = () => {
    const [players, setPlayers] = useState([]);
    
    useEffect(() => {
        getAllPlayers();
    }, []);

    const deletePlayerData = async (id) => {
        await deletePlayer(id);
        getAllPlayers();
    }

    const getAllPlayers = async () => {
        let response = await getPlayers();
        //let response = await getEligiblePlayers();
        setPlayers(response.data);
        console.log(players);
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
                {players.map((player) => (
                    <TRow key={player.id}>
                        <TableCell>{player._id}</TableCell> {/* change it to user.id to use JSON Server */}
                        <TableCell>{player.name}</TableCell>
                        <TableCell>{player.dept}</TableCell>
                        <TableCell>{player.year}</TableCell>
                        <TableCell>{player.speciality}</TableCell>
                        <TableCell>{player.wk}</TableCell>
                        <TableCell>{player.registered}</TableCell>
                        <TableCell>{player.soldto}</TableCell>
                        <TableCell>
                            <Button color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/edit/${player._id}`}>Edit</Button> {/* change it to user.id to use JSON Server */}
                            <Button color="secondary" variant="contained" onClick={() => deletePlayerData(player._id)}>Delete</Button> {/* change it to user.id to use JSON Server */}
                        </TableCell>
                    </TRow>
                ))}
            </TableBody>
        </StyledTable>
    )
}

export default AllPlayers;