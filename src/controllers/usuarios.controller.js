import { db } from "../database/database.connection.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {
    const { nome, email, senha } = req.body;
    try {
        const user = await db.collection("usuarios").findOne({ email });
        if (user) return res.status(409).send("E-mail já cadastrado.");
        const hash = bcrypt.hashSync(senha, 10);
        await db.collection("usuarios").insertOne({ nome, email, senha: hash });
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function signIn(req, res) {
    const { email, senha } = req.body;
    try {
        const user = await db.collection("usuarios").findOne({ email });
        if (!user) return res.status(404).send("E-mail não cadastrado.");
        if (user && !bcrypt.compareSync(senha, user.senha)) return res.status(401).send("Senha incorreta.");

        const token = uuid();
        await db.collection("sessoes").insertOne({ userId: user._id, token });
        const infosUser = {
            "token": token,
            "user": user.nome
        }
        res.send(infosUser);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}