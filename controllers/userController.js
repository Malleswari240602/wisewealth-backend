const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
exports.registerUser = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    const normalizedEmail = email.toLowerCase();

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [normalizedEmail],
        async (err, result) => {
            if (err) return res.status(500).json({ error: err });

            if (result.length > 0) {
                return res.status(400).json({ message: "Email already registered" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                [name, normalizedEmail, hashedPassword],
                (err) => {
                    if (err) return res.status(500).json({ error: err });

                    res.status(200).json({ message: "User registered successfully" });
                }
            );
        }
    );
};

// LOGIN USER
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email & password required" });
    }

    const normalizedEmail = email.toLowerCase();

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [normalizedEmail],
        async (err, result) => {
            if (err) return res.status(500).json({ error: err });

            if (result.length === 0) {
                return res.status(400).json({ message: "User not found" });
            }

            const user = result[0];

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: "Incorrect password" });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                "secret_key",
                { expiresIn: "1d" }
            );

            delete user.password;

            res.status(200).json({
                success: true,
                message: "Login successful",
                token,
                user
            });
        }
    );
};
