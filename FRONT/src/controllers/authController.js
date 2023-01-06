const fetch = require('node-fetch')
const bcrypt = require('bcrypt');
const validate = require('validate');
const SignupConstraints = require('../services/dataConstraints')

const authController = {
    signin(req,res){
        res.render("signin")
    },
    async formSignin(req, res) {
        const {email, password} = req.body;
        let users;
        try {
            const response = await fetch('http://localhost:5000/api/users');
             users = await response.json();
        } catch(err) {
            console.log(err)
        }

        const correctEmail = users.find(user => user.email == email)

        if(!correctEmail) {
            res.render('signin', {
                errorMessage: 'Mauvais identifiant'
            });
            return;
        }

        const hasPasswordMatched = await bcrypt.compare(password, correctEmail.password);

        if(!hasPasswordMatched) {
        res.render('signin', {
            errorMessage: 'Mauvais identifiant'
        });
        return;
    }

        res.redirect('/');
    },
    async users(req,res) {
        const response = await fetch('http://localhost:5000/api/users');
        users = await response.json();
        console.log(users)
        res.render('users', {users})

    },
    renderSignupPage(req,res) {
        res.render('signup')
    },
    async formSignup(req,res) {
        let users;

    

        try {
            const response = await fetch('http://localhost:5000/api/users');
             users = await response.json();
        } catch(err) {
            console.log(err)
        }

        const emailFound = users.find(user => user.email == req.body.email)
        if(emailFound) {
            res.render('signup', {
              errorMessage: 'Un compte existe déjà, veuillez vous connecter'
            });
            return;
        }
        console.log(req.body.password != req.body.paswword_conf)
        console.log(req.body.password)
        console.log(req.body.paswword_conf)
        if(req.body.password !== req.body.password_conf) {
        console.log('ok')
        res.render('signup', {
            errorMessage: 'Mot de passe différent de la confirmation'
        });
        return;
        }

        //hash the password
        const passwordHashed = await bcrypt.hash(req.body.password, 10);
        req.body.password = passwordHashed;

        delete req.body.password_conf
        console.log(req.body)

        try {
            const userCreated = await fetch(`http://localhost:5000/api/users`, {
                method: 'POST',
                // on passe les données du formulaire en body du POST
                body: JSON.stringify(req.body),
                headers: {
                    'Content-Type': 'application/json'
                  }
            });
            
            //req.session.userId = userCreated.id;
          } catch(e) {
            res.render('signup', {
              errorMessage: 'Veuillez vérifier les champs du formulaire'
            });
            return;
          }

        res.redirect('/users')
    }

}


module.exports = authController