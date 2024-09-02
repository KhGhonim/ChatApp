import jwt from 'jsonwebtoken'

export default function JWTverifier(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({
      message: "Please Login Again",
    });
  }

  try {

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(500).json({
          message: "Invalid Token",
        });
      }

      const remainingTime = user.exp * 1000 - Date.now();
      if (remainingTime < 600000) {
        const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie("jwt", newToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "None",
          maxAge: 3600000,
        });
      }

      req.user = user;
      next();
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}