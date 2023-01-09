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
        let {email, password} = req.body;

        //put everything in lower case
        email = email.toLowerCase()

        let users;
        try {
            const response = await fetch('http://localhost:5000/api/users');
             users = await response.json();
        } catch(err) {
            res.send('Une erreur est survenue, veuillez réesayer ultérieurement');
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
        req.session.userEmail = correctEmail.email
        req.session.userFname = correctEmail.fname
        req.session.userLname = correctEmail.lname
        req.session.userID = correctEmail.id


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

        //put everything in lowercase for email and uppercase for f/lname
        req.body.email = req.body.email.toLowerCase()
        req.body.fname = req.body.fname.toUpperCase()
        req.body.lname = req.body.lname.toUpperCase()


        try {
            const response = await fetch('http://localhost:5000/api/users');
             users = await response.json();
        } catch(err) {
            res.send('Une erreur est survenue, veuillez réesayer ultérieurement')
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