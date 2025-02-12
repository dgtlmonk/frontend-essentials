import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3001;

// This would be in a secure environment variable in production
const JWT_SECRET = "your-secret-key";

// Mock user database
const users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: /http:\/\/localhost:\d+$/, // Regex for any localhost port
    credentials: true,
  })
);

// SSO Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Find user (in real world, use proper password hashing)
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Set token in HTTP-only cookie
  res.cookie("sso_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 3600000, // 1 hour
  });

  res.json({
    message: "Login successful",
    user: { id: user.id, username: user.username },
  });
});

// Verify token endpoint
app.get("/verify", (req, res) => {
  const token = req.cookies.sso_token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({
      isValid: true,
      user: { id: decoded.userId, username: decoded.username },
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

// Logout endpoint
app.post("/logout", (req, res) => {
  res.clearCookie("sso_token");
  res.json({ message: "Logged out successfully" });
});

app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});
