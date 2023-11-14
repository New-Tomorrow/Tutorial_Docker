import { Router } from "express";
import { EmployeeController } from "../controllers";

const routes = Router();

routes.post("/create", EmployeeController.create); 
routes.patch("/update/:id", EmployeeController.update);
routes.delete("/delete", EmployeeController.delete);
routes.get("/list", EmployeeController.list);
routes.get("/one/:id", EmployeeController.one);

export default routes;