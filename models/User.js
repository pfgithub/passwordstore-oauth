const mongoose = require("mongoose");

function validateUsername(username) {
  let errorMsg = {
    "lengthMin": "at least three characters",
    "lengthMax": "at most 20 characters",
    //"chars": "must start and end with a letter or number"
    "spaces": "may not contain spaces"
  };
  if(username.length >= 3) delete errorMsg.lengthMin;
  if(username.length <= 20) delete errorMsg.lengthMax;
  //if((new RegExp(/^[A-Za-z0-9].*[A-Za-z0-9]$/)).test(username)) delete errorMsg.chars;
  if(!(new RegExp(/\s/)).test(username)) delete errorMsg.chars;
  new RegExp(/^test\.^/).test("hi");
  if(Object.values(errorMsg).length)
    throw new Error(Object.values(errorMsg));
  return true;
}

const userSchema = new mongoose.Schema({
  "username": {
    "type": String,
    "unique": true,
    "validate": [{ "validator": validateUsername, "msg": "Invalid username" }],
  },
  "password": {"type": String, "required": true}, // , unique: true. Error: password hash must be unique! Please try again
  "data": Buffer,
  "2faSecret": String,
  "_version": {"type": String, "default": "VERSION_1"}
}, { "timestamps": true });
const User = mongoose.model("User", userSchema);

module.exports = User;
