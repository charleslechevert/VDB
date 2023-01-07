  const authMiddleware = {
  // Le but de ce middleware est de rediriger l'utilisateur sur la page de connection si il essaye d'accèder à une route nécessitant la connection.
  checkIsLogged(req, res, next) {
    // Si mon utilisateur n'est pas connecter, je le redirige sur la page de login
    if(!req.session.userID) {
      res.redirect('/signin');
    } else {
      // Si il est connecter je le laisse faire l'action
      next();
    }
  }
}

module.exports = authMiddleware;