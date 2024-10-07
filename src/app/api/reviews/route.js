import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();
 
 
 
export async function POST(req) {
  try {
    const {id,proid,comment,rating} = await req.json();
    
    const now = new Date();
    const addedDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const addedTime = now.toTimeString().split(' ')[0]; // HH:MM:SS
    const addedDay = now.toLocaleString('en-US', { weekday: 'long' }); // Full day name (e.g., Monday)
 
    const sql = `INSERT INTO reviews (userid,productid,reviewcomment,rating, addeddate, addedtime, addedday) VALUES ($1, $2, $3, $4, $5,$6,$7)`;
    const inputs = [id,proid,comment,rating, addedDate, addedTime, addedDay];
 
    const result = await pool.query(sql, inputs);
    
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
  try {
    const productId=req.url.split("?")[1];
    let result;
    if(productId!="AllProducts")
    {
    const sql='SELECT DISTINCT reviews.reviewid,products.productname,reviews.reviewcomment,reviews.userid,users.firstname, reviews.rating FROM reviews JOIN products ON products.productid = reviews.productid JOIN users ON users.userid = reviews.userid WHERE products.productid = $1 ORDER BY reviews.reviewid DESC';
     result = await pool.query(sql,[productId]);
    }
    else
    {
      const sql='select DISTINCT reviews.reviewid, firstname,reviewcomment,reviews.productid,products.productname  from reviews join users on users.userid = reviews.userid join products ON products.productid = reviews.productid';
      result = await pool.query(sql);
    }
    // console.log(result.rows,"result review")
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
 
export async function DELETE(request) {
 
  console.log("venky")
  try{
    const id =  request.url.split('?')[1].split('=')[1];
    console.log(id,"jayammanedhera");
 
    const sql = "delete from reviews  where reviewid = $1";
    const result = await pool.query(sql,[id]);
    return new Response("Deleted successfully",{
      status:200,
      headers:{'Content-Type':'application/json'}
    })
  }catch (error){
    return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
 
  }
}