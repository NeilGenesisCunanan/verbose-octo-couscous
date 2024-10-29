import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.post('/users', async (req, res) => {
    const user = req.body;
    
    //TODO : Create a user in the database
    const result = await User.create(user)
    return res.status(201).json(result);
});

router.get('/users/:id', async (req, res) => {
    const id = req.params.id;

    let errorMessage = null;

    try{
        const user = await User.findById(id);
        if(user){
            return res.json(user);
        }

        errorMessage = 'User not found';
    }
    catch(error){
        errorMessage = 'User not found or Invalid ID';  
    }

    return res.status(404).json({error: errorMessage});
});    

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch users' });
    }
});

export default router;