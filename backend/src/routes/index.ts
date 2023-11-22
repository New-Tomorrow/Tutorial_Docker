import { Router, Request, Response } from "express";
import employee from "./employee";

const routes = Router()

routes.use("/employee", employee);

routes.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default routes;
