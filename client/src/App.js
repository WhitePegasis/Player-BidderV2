import AllPlayers from './Component/AllPlayers';
import AddPlayer from './Component/AddPlayer';
import EditPlayer from './Component/EditPlayer';
import AddTeam from './Component/AddTeam';
import NavBar from './Component/NavBar';
import NotFound from './Component/NotFound'; 
import HomePage from './Component/HomePage';
import AllTeams from './Component/AllTeams';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllEligiblePlayers from './Component/BiddingPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage /> } />
        <Route path="all" element={<AllPlayers /> } />
        <Route path="allTeams" element={<AllTeams />} />
        <Route path="eligible" element={<AllEligiblePlayers /> } />
        <Route path="/add" element={<AddPlayer />} />
        <Route path="/addTeam" element={<AddTeam />} />
        <Route path="/edit/:id" element={<EditPlayer />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
