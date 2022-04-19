const { User } = require("../models/index");

module.exports = fillScript = async () => {
  try {
       await User.create({
          name:"Axel",
          surname:"Lois",
          email:"axel9034@hotmail.com",
          password:"admin"
      })
  } catch (error) {
      console.log(error);
  }
};
