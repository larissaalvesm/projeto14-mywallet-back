import { db } from "../database/database.connection.js";
import { transacaoSchema } from "../schemas/transacoes.schemas.js";

export async function createTransaction(req, res) {
    const { valor, descricao, tipo } = req.body;

    try {
        const sessao = res.locals.sessao;
        const dataHora = new Date().toLocaleString('pt-BR');
        await db.collection("transacoes").insertOne({ valor, descricao, tipo, idUsuario: sessao.userId, dataHora });
        res.sendStatus(200);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function getTransactions(req, res) {
    try {
        const sessao = res.locals.sessao;
        const transacoes = await db.collection("transacoes").find({ idUsuario: sessao.userId }).toArray();
        res.send(transacoes.reverse());
    } catch (err) {
        return res.status(500).send(err.message);
    }
}