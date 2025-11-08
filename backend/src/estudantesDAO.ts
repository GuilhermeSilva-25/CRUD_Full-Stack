import pool from "./database.js";
import type { Estudante } from "./estudante.types.js";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";

type EstudanteRow = Estudante & RowDataPacket;

export class EstudanteDAO {

  async getAll(): Promise<Estudante[]> {
    let conn;
    try {
      conn = await pool.getConnection();
      const sql = "SELECT * FROM estudante";
      
      const [rows] = await conn.query<EstudanteRow[]>(sql);
      
      return rows;
    } catch (error) {
      console.error("Erro ao buscar todos os estudantes:", error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  async getById(id: number): Promise<Estudante | undefined> {
    let conn;
    try {
      conn = await pool.getConnection();
      const sql = "SELECT * FROM estudante WHERE id = ?";
      
      const [rows] = await conn.query<EstudanteRow[]>(sql, [id]);
      
      return rows[0];
    } catch (error) {
      console.error(`Erro ao buscar estudante ${id}:`, error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  async create(nome: string, email: string): Promise<Estudante> {
    let conn;
    try {
      conn = await pool.getConnection();
      const sql = "INSERT INTO estudante (nome, email) VALUES (?, ?)";

      const [result] = await conn.query<ResultSetHeader>(sql, [nome, email]);
      
      const insertId = result.insertId;
      return { id: insertId, nome, email };
    } catch (error) {
      console.error("Erro ao inserir estudante:", error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  async update(id: number, nome: string, email: string): Promise<number> {
    let conn;
    try {
      conn = await pool.getConnection();
      const sql = "UPDATE estudante SET nome = ?, email = ? WHERE id = ?";
      
      const [result] = await conn.query<ResultSetHeader>(sql, [nome, email, id]);
      
      return result.affectedRows; // Retorna o número de linhas afetadas
    } catch (error) {
      console.error(`Erro ao atualizar estudante ${id}:`, error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  async delete(id: number): Promise<number> {
    let conn;
    try {
      conn = await pool.getConnection();
      const sql = "DELETE FROM estudante WHERE id = ?";
      
      const [result] = await conn.query<ResultSetHeader>(sql, [id]);
      
      return result.affectedRows;
    } catch (error) {
      console.error(`Erro ao deletar estudante ${id}:`, error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }
}