const { User } = require('../models');
const TokenAuth = require('../helper/AuthToken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto")
const sendEmail = require('../helper/transporter');
const jwt = require("jsonwebtoken");
const generatePassword = require('../helper/generatePassword');

class studentController {

  static async createStudent(req, res) {
    try {
      const uniqueId = Math.floor(Math.random() * 900000) + 100000
      const salt = await bcrypt.genSaltSync(10);
      const emailToken = crypto.randomBytes(16).toString("hex");
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
      const user = await User.build({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        address: req.body.address,
        emailToken: emailToken,
        role: req.body.role || "client",
        isVerified: false,
        UniqueId: uniqueId
      });
      const emailExists = await User.findOne({ where: { email: req.body.email, } });
      if (emailExists) {
        return res.status(401).json({ error: "Email already registered, Try another email" })
      }
      const token = await TokenAuth.TokenGenerator({ user: user })
      await user.save()
      sendEmail(user, 'createAccount')
      return res.status(200).json({ message: "account created successfully", token, user })

    } catch (error) {
      res.status(404).json({ error: error.message })
    }

  }

  static async emailVerification(req, res) {
    try {
      const token = req.params.token
      const user = await User.findOne({ where: { emailToken: token } })
      if (user) {
        user.emailToken = null,
          user.isVerified = true
        await user.save()
        res.status(200).json({ message: "account verified successfully" })
      } else {
        res.status(400).json({ error: "invalid token" })
      }
    } catch (error) {

      return res.status(500).json({ error: "server error" })
    }

  }

  static async loginUser(req, res) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });

      if (!user) {
        return res.status(404).json({ message: "User not found, you have to register first" })
      }
      if (!user.isVerified) {
        return res.status(400).json({ message: 'your email is univerified. verify your email before proceed to login' })
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password)
      if (!isMatch) {
        return res.status(404).json({ error: "Password is incorrect" })
      }
      const token = TokenAuth.TokenGenerator({ user: user });
      return res.status(200).json({ message: "user logged in successfully", user: user, token: token })
    } catch (error) {
      return res.status(401).json({ message: "something went wrong" })
    }
  }

  static async refreshTokens(req, res) {
    try {
      let user = req.user
      try {
        user = await User.findOne({ where: { email: req.user.email } })
      } catch (error) {
        return res.status(404).json({ error: "user not found" })
      }
      const token = TokenAuth.TokenGenerator({ user: user })
      return res.status(200).json({ message: "token refreshed successfully", token, user })
    } catch (error) {
      return res.status(500).json({ message: "server error" })
    }
  }
  static async getAllUser(req, res) {
    try {
      const users = await User.findAll()
      return res.status(200).json(users)

    } catch (error) {
      console.log(error)
      return res.status(404).json({ error: "something went wrong" })
    }
  }

  static async forgotPassword(req, res) {
    try {
      const user = await User.findOne({ where: { email: req.body.email } })

      if (!user) {
        res.json({ error: "there is no user with this email" })
      }
      const userInfo = {
        token: jwt.sign({ uuid: user.uuid }, process.env.RESET_PASSWORD_KEY),
        email: user.email
      }
      sendEmail(userInfo, 'forgotPassword')
      return res.status(200).send({ message: 'Password reset mail Sent Successfully' })
    } catch (error) {
      return res.status(404).json({ error: error.message })
    }
  }
  static async resetPassword(req, res) {
    try {
      const token = req.params.token
      if (token) {
        const data = await jwt.verify(token, process.env.RESET_PASSWORD_KEY)
        const userInfos = await User.findOne({ where: { uuid: data.uuid.toString() } })
        if (!userInfos) {
          return res.status(404).json({ error: "user not found" })
        }
        const salt = await bcrypt.genSaltSync(10);
        const newHashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = await User.findOne({ where: { uuid: userInfos.uuid } })
        user.password = newHashedPassword
        user.isVerified = true;
        await user.save()
        res.status('201').json({ message: 'Password reset successfully', user })
      }
    } catch (error) {
      return res.status(404).json({ error: error.message })
    }

  }
  static async getUserById(req, res) {
    try {
      const uuid = req.params.uuid
      const user = await User.findOne({
        where: { uuid }
      })
      return res.status(200).json(user)
    } catch (error) {
      console.log(error)
      return res.status(404).json({ error: "something went wrong" })
    }
  }
  static async deleteUser(req, res) {
    try {
      const uuid = req.params.uuid
      const user = await User.findOne({ where: { uuid } })
      await user.destroy()
      return res.status(200).json({ message: " user deleted successfully" })

    } catch (error) {
      return res.status(500).json({ error: "server error" })
    }
  }
  static async updateUser(req, res) {
    console.log(req.body)
    console.log(req.params)
    const { email, address, username, role, isVerified } = req.body
    const uuid = req.params.uuid
    try {
      const user = await User.findOne({ where: { uuid } })
      user.email = email,
        user.address = address,
        user.username = username,
        user.role = role
      user.isVerified = isVerified
      await user.save()
      return res.status(200).json({ message: "user updated successfully", user })

    } catch (error) {
      return res.status(404).json({ error: " something went wrong" })

    }
  }
}
module.exports = studentController;