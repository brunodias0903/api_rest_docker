import fs from "fs-extra";
import path from "path";
import initSqlJs, { Database } from "sql.js";

export interface Company {
  id?: number;
  name: string;
  cnpj: string;
  email: string;
  phone?: string;
}

let db: Database;
const dbFilePath = "/usr/src/app/data/empresa.db";

export const initializeDatabase = async (): Promise<void> => {
  try {
    const SQL = await initSqlJs();

    await fs.ensureDir(path.dirname(dbFilePath));

    db = new SQL.Database();

    db.exec(`
      CREATE TABLE IF NOT EXISTS companies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        cnpj TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL,
        phone TEXT
      )
    `);

    try {
      if (fs.existsSync(dbFilePath)) {
        const dbBuffer = fs.readFileSync(dbFilePath);
        db = new SQL.Database(dbBuffer);
      }
    } catch (err) {
      console.log("Creating new database file");
    }

    const data = db.export();
    fs.writeFileSync(dbFilePath, Buffer.from(data));

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
};

const saveDatabase = (): void => {
  const data = db.export();
  fs.writeFileSync(dbFilePath, Buffer.from(data));
};

export const createCompany = (company: Company): Company => {
  try {
    const stmt = db.prepare(
      "INSERT INTO companies (name, cnpj, email, phone) VALUES (?, ?, ?, ?)"
    );

    stmt.bind([
      company.name,
      company.cnpj,
      company.email,
      company.phone || null,
    ]);
    stmt.step();
    stmt.free();

    const result = db.exec("SELECT last_insert_rowid() as id")[0];
    const id = result.values[0][0] as number;

    saveDatabase();

    return {
      id,
      ...company,
    };
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};

export const getAllCompanies = (): Company[] => {
  try {
    const result = db.exec("SELECT * FROM companies");

    if (result.length === 0) {
      return [];
    }

    const companies: Company[] = [];
    const columns = result[0].columns;
    const rows = result[0].values;

    for (const row of rows) {
      const company: any = {};
      columns.forEach((column, index) => {
        company[column] = row[index];
      });
      companies.push(company as Company);
    }

    return companies;
  } catch (error) {
    console.error("Error getting companies:", error);
    throw error;
  }
};
