import UserModel from "../Models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const Register = async (req, res, next) => {

  const { fullName, email, password, confirmPassword, gender } = req.body

  if (!fullName || !email || !password || !confirmPassword || !gender) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields"
    })
  }

  if (password.length < 6 || confirmPassword.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters"
    })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match"
    })
  }

  const oldUser = await UserModel.findOne({ email })
  if (oldUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists"
    })
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await UserModel.create({ fullName, email, password: hashedPassword, gender, profilePic: "https://avatar.iran.liara.run/public" })
  res.status(200).json({ newUser })


}

export const SignIn = async (req, res, next) => {

  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields"
    })
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters"
    })
  }

  try {

    const FindUser = await UserModel.findOne({ email })
    if (!FindUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist"
      })
    }

    const checkPassword = await bcrypt.compare(password, FindUser.password)
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Wrong password"
      })
    }

    if (FindUser && checkPassword) {
      const token = jwt.sign({ id: FindUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None", // Allows cross-site cookie sendingm
        maxAge: 3600000,
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token: token,
        user: FindUser
      });
    }
  } catch (error) {
    console.log("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }

}


export const LogOut = (req, res, next) => {

  res.cookie("jwt", "", {
    httpOnly: true,
    sameSite: "None",
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logged out successfully" });
}