import { Router } from "express";
import { signIn, signUp } from "../controllers/usuarios.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { userLoginSchema, userSchema } from "../schemas/usuarios.schemas.js";

const usuariosRouter = Router();

usuariosRouter.post("/cadastro", validateSchema(userSchema), signUp);

usuariosRouter.post("/", validateSchema(userLoginSchema), signIn);

export default usuariosRouter;