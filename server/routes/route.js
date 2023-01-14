import express from 'express';
import { getUsers,getEligibleUsers, addUser, getUserById, editUser, deleteUser } from '../controller/user-controller.js';
import { getTeams,addTeam, editTeam } from '../controller/team-controller.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/eligible', getEligibleUsers);
router.post('/add', addUser);
router.get('/:id', getUserById);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);
router.get('/allTeams',getTeams);
router.post('/addTeam', addTeam);
router.put('/editTeam/:id', editTeam);

export default router;