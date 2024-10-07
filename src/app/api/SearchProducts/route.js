import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();

export async function GET(request){
    const requrl=request.url;
    const searchKey = requrl.split('?')[1].split('=')[1];
    const searchString = searchKey.charAt(0)+searchKey.slice(1);
    const pattern1 = `%${searchString.toLowerCase()}`;//Change as per in the data base
    const pattern2 = `${searchString.toLowerCase()}%`;
    const pattern3 = `%${searchString.toLowerCase()}%`;
    // if
    try {
        const sql=`SELECT * FROM Products WHERE productname LIKE $1 OR productname LIKE $2 OR productname LIKE $3 ;`
        const result=await pool.query(sql,[pattern1,pattern2,pattern3]);
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