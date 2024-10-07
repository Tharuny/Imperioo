import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();

export async function POST(req) {
  try {
   
    const { imageUrls } = await req.json();
    const sql = `INSERT INTO images (imgurl1,imgurl2,imgurl3,imgurl4,imgurl5,imgurl6) VALUES ($1, $2, $3, $4, $5,$6)`;
  const inputs = [imageUrls[0],imageUrls[1],imageUrls[2],imageUrls[3],imageUrls[4],imageUrls[5]]
    
    const result = await pool.query(sql,inputs);
    return new Response(JSON.stringify({ success: true }), {
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


export async function GET(req) {
  const {productname} = req.query
  try {

    const sql="SELECT * FROM products WHERE productName LIKE $1 ";
    const inputs =  [`%${productname}%`];
    const result = await pool.query(sql,inputs);
    return new Response(JSON.stringify(result.rows), {
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