require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(
 cors({
   origin: "*",
   methods: ["GET", "POST", "PUT", "DELETE"],
   allowedHeaders: ["Content-Type"],
 })
);
app.use(express.json());

/* =========================
   MYSQL CONNECTION
========================= */

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.log("❌ Database Connection Error");
    console.log(err);
  } else {
    console.log("✅ MySQL Connected Successfully");
  }
});

/* =========================
   HOME API
========================= */

app.get("/", (req, res) => {
  res.send("🚴 BRING GEAR Server Running");
});

/* =========================
   SIGNUP API
========================= */

app.post("/signup", (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    password,
    country,
    state,
    city,
    pincode,
    house_no,
    street,
    area,
    landmark,
  } = req.body;

  // CHECK IF EMAIL EXISTS
  const checkEmailQuery =
    "SELECT * FROM users WHERE LOWER(email) = LOWER(?)";

  db.query(checkEmailQuery, [email], (checkErr, checkResult) => {
    if (checkErr) {
      console.log(checkErr);

      return res.status(500).send({
        success: false,
        message: "Database Error",
      });
    }

    // EMAIL EXISTS
    if (checkResult.length > 0) {
      return res.status(400).send({
        success: false,
        message: "Email Already Exists",
      });
    }

    // INSERT USER
    const insertQuery = `
      INSERT INTO users
      (
        first_name,
        last_name,
        email,
        phone,
        password,
        country,
        state,
        city,
        pincode,
        house_no,
        street,
        area,
        landmark
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertQuery,
      [
        first_name,
        last_name,
        email,
        phone,
        password,
        country,
        state,
        city,
        pincode,
        house_no,
        street,
        area,
        landmark,
      ],
      (insertErr, result) => {
        if (insertErr) {
          console.log(insertErr);

          return res.status(500).send({
            success: false,
            message: "Signup Failed",
          });
        }

        return res.send({
          success: true,
          message: "Account Created Successfully",
        });
      }
    );
  });
});

/* =========================
   LOGIN API
========================= */

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const loginQuery = `
    SELECT * FROM users
    WHERE LOWER(email) = LOWER(?)
    AND password = ?
  `;

  db.query(loginQuery, [email, password], (err, result) => {
    if (err) {
      console.log("❌ LOGIN ERROR");
      console.log(err);

      return res.status(500).send({
        success: false,
        message: "Database Error",
      });
    }

    // LOGIN SUCCESS
    if (result.length > 0) {
      return res.send({
        success: true,
        message: "Login Successful",
        user: result[0],
      });
    }

    // LOGIN FAILED
    return res.status(401).send({
      success: false,
      message: "Invalid Email or Password",
    });
  });
});

/* =========================
   SERVER START
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});