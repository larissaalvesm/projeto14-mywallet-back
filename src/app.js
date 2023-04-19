import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import joi from "joi";
import bcrypt from 'bcrypt';
import dotenv from "dotenv";

// Criação do servidor
const app = express();

// Configurações
app.use(express.json());
app.use(cors());
dotenv.config();

// Conexão com o Banco de Dados
let db;
const mongoClient = new MongoClient(process.env.DATABASE_URL);
mongoClient.connect()
    .then(() => db = mongoClient.db())
    .catch((err) => console.log(err.message));

//Schemas
const userSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().min(3).required()
})

// Endpoints
app.post("/cadastro", async (req, res) => {
    //nome, email, senha
    const { nome, email, senha } = req.body;

    const validation = userSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const user = await db.collection("usuarios").findOne({ email });
        if (user) return res.status(409).send("E-mail já cadastrado.");
        const hash = bcrypt.hashSync(senha, 10);
        await db.collection("usuarios").insertOne({ nome, email, senha: hash });
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
})

// Deixa o app escutando, à espera de requisições
const PORT = 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))