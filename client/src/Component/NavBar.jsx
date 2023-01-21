
import { AppBar, Toolbar, styled } from '@mui/material';

import { NavLink } from 'react-router-dom';


const Header = styled(AppBar)`
    background: #111111;
`;
    
const Tabs = styled(NavLink)`
    fontWeight : bold;
    color: #FFFFFF;
    margin-right: 20px;
    text-decoration: none;
    font-size: 20px;
`;

const NavBar = () => {
    return (
        <Header position="static">
            <Toolbar>
                <Tabs to="./" exact><b>MCL</b></Tabs>
                <Tabs to="all" exact><b>All Players</b></Tabs>
                <Tabs to="allTeams" exact><b>All Teams</b></Tabs>
                <Tabs to="add" exact><b>Add Player</b></Tabs>
                <Tabs to="addTeam" exact><b>Add Team</b></Tabs>
                <Tabs to="eligible" exact><b>Eligible Players</b></Tabs>
            </Toolbar>
        </Header>
    )
}

export default NavBar;