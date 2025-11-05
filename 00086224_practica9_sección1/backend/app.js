// app.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import rutaUser from "./rutas/rutaUsers.js"
import rutaAut from "./rutas/rutaAutenticacion.js"

const app = express();
const PORT = 5001;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/autenticacion', rutaAut);
app.use('/api/users', rutaUser);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`)
);

