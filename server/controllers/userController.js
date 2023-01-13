const Users = require('../models/usersModel');

//Add and return the User
exports.addUser = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    
    const user = await Users.create({firstName, lastName, email});
    
    return res.status(200).send(user)
};

//Return all Users
exports.getUser = async (req, res) => {
    const users = await Users.find();

    if (users.length===0) {
      throw new Error('There are no Users');
    }

    return res.status(200).send(users);
};