const fetch = require('node-fetch')

const userController = {
async deleteUser(req,res) {
    try {
        const response = await fetch(`PROCESS.ENV.URL/api/users/${req.params.id}`, {
            method: 'DELETE',
        });

    } catch(err) {
        console.log(err)
    }

    res.redirect('/users')

}

};

module.exports = userController;