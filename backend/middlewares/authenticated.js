var User = require("../models/collaborator");
var jwt = require("jwt-simple");
var moment = require("moment");
var secret = process.env.SECRET_KEY;

const validateJWT = (req, res, next) => {
  if (!req.headers.token) {
    return res.status(403).send({ msg: "No token provided" });
  }

  var token = req.headers.token.replace(/['"]+/g, "");
  var segment = token.split(".");

  if (segment.length != 3) {
    return res.status(403).send({ msg: "Invalid token" });
  } else {
    try {
      var payload = jwt.decode(token, secret);
      if (payload.exp <= moment().unix()) {
        return res.status(403).send({ msg: "Expired token" });
      }
    } catch (error) {
      return res.status(403).send({ msg: "Invalid token" });
    }
  }
  req.user = payload;
  req.role = payload.role;
  req.id = payload.sub;
  next();
};

const validateROLE = async (req, res, next) => {
  const id = req.user.sub;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Ususario no encontrado",
      });
    }
    if (user.role !== "Administrador") {
      return res.status(403).json({
        ok: false,
        msg: "No tiene privilegios para realizar esta acción.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado... revisar logs!",
    });
  }
};

module.exports = { validateJWT, validateROLE };
