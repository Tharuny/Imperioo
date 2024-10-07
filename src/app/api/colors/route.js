import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();

export async function POST(req) {
  try {
    const {colorname, colorcode } = await req.json();

    if (!colorname || !colorcode) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = 'INSERT INTO colors ( colorname, colorcode) VALUES ($1, $2)';
    const inputs = [colorname, colorcode];

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


export async function GET() {
  try {

    const sql = 'SELECT * FROM colors';

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

export async function DELETE(request){
  const {id}=await request.json();
  try{
    const sql = 'DELETE FROM colors WHERE colorcode=$1';
    const index = [id];
    const result = await pool.query(sql,index);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  catch{
  }
}

