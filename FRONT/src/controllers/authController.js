const fetch = require('node-fetch')
const bcrypt = require('bcrypt');


const authController = {
    signin(req,res){
        if(!req.session.userID) {
            res.render("signin")
            return
        } else {
            res.redirect('/')
        }   
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
        const userID = correctEmail.id
        const userFname = correctEmail.fname
        const userLname = correctEmail.lname
        const userEmail = correctEmail.email

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
        req.session.userEmail = userEmail
        req.session.userFname = userFname
        req.session.userLname = userLname
        req.session.userID = userID


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
        if(req.body.password !== req.body.password_conf) {
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
            req.session.userEmail = req.body.email;
            req.session.userFname = req.body.fname;
            req.session.userLname = req.body.lname;
            req.session.userID = req.body.id;

            res.redirect('/users')
          } catch(e) {
            res.render('signup', {
              errorMessage: 'Veuillez vérifier les champs du formulaire'
            });
          }
    },
    signout(req,res) {
        req.session.destroy()
        res.redirect('/signin')

    }
}


module.exports = authController