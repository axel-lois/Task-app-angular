const { Task, User } = require("../models/index");

const createUser = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    if (!name || !surname || !email || !password) {
      return res.status(400).send({ error: "Missing data." });
    }
    const user = await User.create({
      name,
      surname,
      email,
      password,
    });
    res.send({ succesMsg: "User created successfully", data: user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const userProfile = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).send({ error: "Missing id." });
    }
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({ error: "User not found." });
    }
    res.send({ succesMsg: "User profile", data: user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
    try {
        const {email,password} = req.body;
        if (!email || !password) {
         return res.status(401).send({ error: "Missing data." });
        }
        const user = await User.findOne({ where: { email}})
        if (!user) {
            return res.status(401).send({ error: "User not found." });
        }
        if(password !== user.password) {
            return res.status(401).send({ error: "Password is incorrect." });
        }
        res.send({ succesMsg: "User logged in.",data: user});
    } catch (error) {
        res.status(500).send({ error:error.message });
    }
};

const logout = (req, res) => {};

module.exports = {
  createUser,
  userProfile,
  login,
  logout,
};
