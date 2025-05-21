import { Company, createCompany, getAllCompanies } from "@/models/Company";
import { Request, Response } from "express";

export class CompanyController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, cnpj, email, phone } = req.body;

      if (!name || !cnpj || !email) {
        res
          .status(400)
          .json({ error: "Name, CNPJ, and email are required fields" });
        return;
      }

      const company: Company = { name, cnpj, email, phone };
      const newCompany = createCompany(company);

      res.status(201).json(newCompany);
    } catch (error: any) {
      if (error.message && error.message.includes("UNIQUE constraint failed")) {
        res
          .status(409)
          .json({ error: "A company with this CNPJ already exists" });
        return;
      }

      res.status(500).json({ error: "Failed to create company" });
    }
  }

  public async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const companies = getAllCompanies();
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve companies" });
    }
  }
}
