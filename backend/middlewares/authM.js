const jwt = require("jsonwebtoken");

function authM(req, res, next) {
  try {
    let token = req.header("Authorization");
    if (!token) {
      res.status(404).json("not allowed in, missing token in the header");
      return;
    }
    // console.log(token);

    let payload = jwt.verify(token, process.env.SECRET);
    if (payload.error) {
      return res.status(403).json({ error: payload.error });
    }
    req.id = payload.id;
    req.username = payload.username;

    next();
  } catch (err) {
    console.log("error on auth middlware");
    console.log(err.message);
  }
}

module.exports = authM;

//  localStorage.setItem(key, value)
//  localStorage.getItem(key)
//  localStorage.removeItem(key)
//  localStorage.clear()
