const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bCrypt = require('bcrypt-nodejs');

module.exports = (passport) => {
  // Generates hash using bCrypt
  const createHash = password =>
    bCrypt.hashSync(
      password, bCrypt.genSaltSync(10), null
    );

  passport.use('signup',
    new LocalStrategy({
      passReqToCallback: true, // allows us to pass back the entire request to the callback
      usernameField: 'email',
    },
    (
      req, username, password, done
    ) => {
      const findOrCreateUser = () => {
        User.findOne({
          email: req.body.email,
        },
        (err, user) => {
          if (err) {
            return done(err);
          }
          // already exists
          if (user) {
            return done(
              null,
              false,
              req.flash('message', 'User Already Exists')
            );
          }
          // if there is no user with that email
          // create the user
          const newUser = new User();

          // set the user's local credentials
          newUser.email = req.body.email;
          newUser.password = createHash(password);
          newUser.role = 'user';

          // save the user
          newUser.save((error) => {
            if (error) {
              console.log(`Error in Saving user: ${error}`);
              throw err;
            }
            console.log('User Registration succesful');

            return done(null, newUser);
          });
        });
      };
        // Delay the execution of findOrCreateUser and execute the method
        // in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    }));
};
