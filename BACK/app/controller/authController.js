const { userModel } = require("../model");
const jwt = require('jsonwebtoken');

const authController = {

async formSigninSubmited(req,res) {

    console.log(req.body)
    const {email, password} = req.body 

    const user = await userModel.findByEmailByPwd(email,password);

    

    if(user) {
        const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET);
        res.send({ token: accessToken, role : user.companyrole });
        } else {
            res.status(401).send({ message: 'Invalid email or password' });
        }
    }
}


module.exports = authController;