import { Router } from "express";
import { CompanyController } from "@/controllers/CompanyController";

const router = Router();
const companyController = new CompanyController();

router.post("/companies", companyController.create);
router.get("/companies", companyController.getAll);

export default router;
