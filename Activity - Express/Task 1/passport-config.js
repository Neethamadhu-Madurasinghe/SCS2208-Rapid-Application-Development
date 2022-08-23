const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByName, getUserById, incrementVisitCount) {
  const authenticateUser = async (username, password, done) => {
    const user = getUserByName(username);
    if(user == null) {
      return done(null, false, { message: "User Not Found !" });
    }
    
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password !" });
      }
    } catch(e) {
      return done(e);
    }
  }
  passport.use(new LocalStrategy({ usernameField: 'username'}, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    done(null, getUserById(id))
  });
}

module.exports = initialize;