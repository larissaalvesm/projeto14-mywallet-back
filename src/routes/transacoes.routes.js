import { Router } from "express";
import { authValidation } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { transacaoSchema } from "../schemas/transacoes.schemas.js";
import { createTransaction, getTransactions } from "../controllers/transacoes.controller.js";

const transacoesRouter = Router();

transacoesRouter.use(authValidation);

transacoesRouter.post("/nova-transacao", validateSchema(transacaoSchema), createTransaction);
transacoesRouter.get("/transacoes", getTransactions);

export default transacoesRouter;