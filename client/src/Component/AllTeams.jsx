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
    let playerIdx=0;
    useEffect(() => {
        getAllTeams();
    }, []);

    const getAllTeams = async () => {
        
        let response = await getTeams();
        //let response = await getEligiblePlayers();
        setTeams(response.data);
        console.log(teams);
        console.log(response.data);
    }

    return (
        <>
            {teams.map((team) =>(
                <StyledTable>
                <TableHead>
                    <THead>
                        <TableCell>{team.name}</TableCell>
                        <TableCell>S.No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Speciality</TableCell>
                        <TableCell>WK</TableCell>
                        <TableCell>Bid-Point</TableCell>
                        <TableCell>P.U: {team.pointsUsed}</TableCell>
                    </THead>
                </TableHead>
                <TableBody>
                
                {
                    team.playerList.map((player, index)=>(
                        
                        (
                            <TRow key={player.id}>
                                <TableCell>{}</TableCell> {/* change it to user.id to use JSON Server */}
                                <TableCell>{index}</TableCell>
                                <TableCell>{player.name}</TableCell>
                                <TableCell>{player.dept}</TableCell>
                                <TableCell>{player.year}</TableCell>
                                <TableCell>{player.speciality}</TableCell>
                                <TableCell>{player.wk}</TableCell>
                                <TableCell>{player.point}</TableCell>
                            </TRow>
                        )
                    ))
                }
                
                </TableBody>
                </StyledTable>
            ))}
                        
        </>  
    )
}

export default AllTeams;