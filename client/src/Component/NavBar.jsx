
import { AppBar, Toolbar, styled } from '@mui/material';

import { NavLink } from 'react-router-dom';


const Header = styled(AppBar)`
    background: #111111;
`;
    
const Tabs = styled(NavLink)`
    color: #FFFFFF;
    margin-right: 20px;
    text-decoration: none;
    font-size: 20px;
`;

const NavBar = () => {
    return (
        <Header position="static">
            <Toolbar>
                <Tabs to="./" exact>MCL</Tabs>
                <Tabs to="all" exact>All Players</Tabs>
                <Tabs to="add" exact>Add Player</Tabs>
                <Tabs to="addTeam" exact>Add Team</Tabs>
                <Tabs to="eligible" exact>Eligible Players</Tabs>
            </Toolbar>
        </Header>
    )
}

export default NavBar;