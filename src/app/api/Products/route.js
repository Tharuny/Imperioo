import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();

export async function GET(request){
    const requrl=request.url;
    const id=requrl.split('?')[1].split('=')[1];
    try {
        const sql='select * from products where products.subcategoryid=$1'
        const result=await pool.query(sql,[id])
        return new Response(JSON.stringify(result.rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
    }
    catch (error) {
        return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

}