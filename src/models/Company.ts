import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

export interface Company {
  id?: number;
  name: string;
  cnpj: string;
  email: string;
  phone?: string;
}

let db: Database;

export const initializeDatabase = async (): Promise<void> => {
  db = await open({
    filename: "./empresa.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      cnpj TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL,
      phone TEXT
    )
  `);
};

export const createCompany = async (company: Company): Promise<Company> => {
  const result = await db.run(
    "INSERT INTO companies (name, cnpj, email, phone) VALUES (?, ?, ?, ?)",
    [company.name, company.cnpj, company.email, company.phone || null]
  );

  return {
    id: result.lastID,
    ...company,
  };
};

export const getAllCompanies = async (): Promise<Company[]> => {
  return await db.all("SELECT * FROM companies");
};
