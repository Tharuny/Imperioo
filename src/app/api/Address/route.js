import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();

export async function POST(req) {
  try {
    const {id, name, address1, city, pincode, country, state, contact } = await req.json();

    if (!id || !name || !address1 || !city || !pincode || !country || !state || !contact) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Generate current date, time, and day
    const now = new Date();
    const addedDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const addedTime = now.toTimeString().split(' ')[0]; // HH:MM:SS
    const addedDay = now.toLocaleString('en-US', { weekday: 'long' }); // Full day name (e.g., Monday)

    const sql = `INSERT INTO address(userid, city, street, statename, country, mobilenumber, pincode, addeddate, addedtime, addedday, name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
    const inputs = [id,city, address1, state, country, contact, pincode, addedDate, addedTime, addedDay, name];

    await pool.query(sql, inputs);

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

export async function GET(request) {
  const id=request.url.split("?")[1].split("=")[1]
  try {

    const Load="SELECT * FROM address where userid=$1";

    const result = await pool.query(Load,[id]);
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

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = 'DELETE FROM address WHERE id = $1';
    await pool.query(sql, [id]);

    return new Response(JSON.stringify({ success: true, message: 'Address deleted successfully' }), {
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


export async function PUT(req) {
  try {
    const { id, name, street, city, statename, pincode, country, mobilenumber } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = `
      UPDATE address 
      SET name = $2, street = $3, city = $4, statename = $5, pincode = $6, country = $7, mobilenumber = $8
      WHERE id = $1
    `;
    const inputs = [id, name, street, city, statename, pincode, country, mobilenumber];

    await pool.query(sql, inputs);

    return new Response(JSON.stringify({ success: true, message: 'Address updated successfully' }), {
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