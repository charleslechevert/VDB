const { userModel } = require("../model");

const controller = {
    async getAllUsers(req,res){
        const users = await userModel.findAll();
        res.json(users);
    },
    async addUser(req,res){
        const user = req.body;

        const userDB = await userModel.insert(user);

        res.json(userDB);
    },
    
    async getUser(req,res){

        const user = await userModel.findById(req.params.id);

        res.json(user);
    },

    async modifyUser(req,res){
        const user = req.body; // les modifications apportées à la catégorie

        const userDB = await userModel.update(req.params.id,user);

        res.json(userDB);
    },
    async deleteUser(req,res){

        const result = await userModel.delete(req.params.id);

        res.json(result);
    }
};

module.exports = controller;