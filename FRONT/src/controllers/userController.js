const fetch = require('node-fetch')

const userController = {
async deleteUser(req,res) {
    try {
        const response = await fetch(`http://localhost:5000/api/users/${req.params.id}`, {
            method: 'DELETE',
        });

    } catch(err) {
        res.send('Une erreur est survenue, veuillez réesayer ultérieurement');
    }

    res.redirect('/users')

}

};

module.exports = userController;