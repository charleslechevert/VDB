const SignupConstraints = {
    fname: {
        presence: true,
        format: /^[a-zA-Z]+$/,
        maximum:20
      },
      lname: {
        presence: true,
        format: /^[a-zA-Z]+$/,
        maximum:20
      },
    email: {
      presence: true,
      email: true
    },
    password: {
      presence: true,
      length: {
        minimum: 8
      }
    },
    admin: {
        presence:true
    }
  };

  module.exports = SignupConstraints