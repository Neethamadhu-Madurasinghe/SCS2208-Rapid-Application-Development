const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const initializePassport = require("./passport-config.js");
 
initializePassport(passport,
  username => users.find(user => user.username === username),
  id => users.find(user => user.id === id)
  );

let users = [];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: "mysecret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.get("/", checkNotAuthenticated, (req, res) => {
  res.render("login");
});


app.get("/home", checkAuthenticated, (req, res) => {

  function incrementVisiteCount (id) {
    users = users.map(user => {
      if(user.id == id) {
        let newUser = user;
        newUser.numberOfLoggins = newUser.numberOfLoggins + 1;
        return newUser;
      }else {
        return user;
      }
    })
  }
  incrementVisiteCount(req.user.id);
  res.render("home", { numberofLoggins: req.user.numberOfLoggins });
  // res.send(`You have accessed ${req.user.numberOfLoggins}`);
})

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      username: req.body.username,
      password: hashedPassword,
      numberOfLoggins: 0
    });
    res.redirect("/home");
    console.log(users);
  } catch {

  }
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/",
  failureFlash: true
}));

app.delete("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


// Middleware to check wther user is authenticated
function checkAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect("/");
}

function checkNotAuthenticated(req, res, next) {
  if(!req.isAuthenticated()) {
    return next();
  }

  res.redirect("/home");
}



app.listen(3000);