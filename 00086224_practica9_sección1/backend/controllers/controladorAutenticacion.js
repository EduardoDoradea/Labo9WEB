
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../middleware/token.js"
import { pool } from "../data/conexion.js";
import bcrypt from 'bcrypt';
import hashPassword from "../utils/funcionHash.js"

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = result.rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token =  jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token });

    } catch (error) {
        console.error("Error during signin:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const signup = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Faltan campos: nombre, email o contrasenia' });
    }
    const passwordHash = await hashPassword.hashPassword(password);
    //const hashedPassword = await bcrypt.hash(String(password), 10);

    pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
        [name, email, passwordHash], (error, results) => {
            if (error) {
                console.error("Error al obtener usuarios:", error);
                res.status(500).json({ error: "Error interno del servidor" });
                return;
            }
            res.status(200).json("Se ha realizado creado el usuario con exito. " + results.rows);
        });
}

export default { signin, signup };