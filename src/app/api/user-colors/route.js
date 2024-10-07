
import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();

export async function GET() {
    try {
  
      const sql = 'SELECT * FROM colors LIMIT 5 ';
  
      const result = await pool.query(sql);
  
      return new Response(JSON.stringify({ success: true, data: result.rows }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }