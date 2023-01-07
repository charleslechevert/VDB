const fetch = require('node-fetch')

const userController = {
async deleteUser(req,res) {
    try {
        const response = await fetch(`http://localhost:5000/api/users/${req.params.id}`, {
            method: 'DELETE',
        });

    } catch(err) {
        console.log(err)
    }

    res.redirect('/users')

}

};

module.exports = userController;