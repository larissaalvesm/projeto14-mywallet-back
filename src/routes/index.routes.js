import { Router } from "express";
import transacoesRouter from "./transacoes.routes.js";
import usuariosRouter from "./usuarios.routes.js";

const router = Router();
router.use(usuariosRouter);
router.use(transacoesRouter);

export default router;