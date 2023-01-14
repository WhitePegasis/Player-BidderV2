import AllPlayers from './Component/AllPlayers';
import AddPlayer from './Component/AddPlayer';
import EditPlayer from './Component/EditPlayer';
import AddTeam from './Component/AddTeam';
import NavBar from './Component/NavBar';
import NotFound from './Component/NotFound'; 
import CodeForInterview from './Component/CodeForInterview';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllEligiblePlayers from './Component/BiddingPage';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<CodeForInterview /> } />
        <Route path="all" element={<AllPlayers /> } />
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
