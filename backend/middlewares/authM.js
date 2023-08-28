async function authM(req, res, next) {
  let hello = req.header("hello");
  if (!hello) {
    res.status(404).json("not allowed in");
    return;
  }

  next();
}

module.exports = authM;

//  localStorage.setItem(key, value)
//  localStorage.getItem(key)
//  localStorage.removeItem(key)
//  localStorage.clear()
