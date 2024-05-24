const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../models/user");
const Writer = require("../models/writer");

/* Using email instead of username with local strategy:

  Passport Local Strategy automatically assumes you are using "username" for authentication - you need to 
  state it (as we have done below) before running the callback function. See https://stackoverflow.com/questions/18138992/use-email-with-passport-local-previous-help-not-working
*/
passport.use("user_local", new LocalStrategy({ usernameField: "email"}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return done(null, false, { message: "Incorrect email" });
    };
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password" })
    }
    return done(null, user);
  } catch(err) {
    return done(err);
  };
}));

passport.use("writer_local", new LocalStrategy({ usernameField: "email"}, async (email, password, done) => {
  try {
    const user = await Writer.findOne({ email: email });
    if (!user) {
      return done(null, false, { message: "Incorrect email" });
    };
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password" })
    }
    return done(null, user);
  } catch(err) {
    return done(err);
  };
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});
  
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch(err) {
//     done(err);
//   };
// });

module.exports = passport;