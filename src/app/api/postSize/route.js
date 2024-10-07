import pool from 'utils/db';

export async function GET() {
  try {
    const sql = 'SELECT * FROM sizes';
    const result = await pool.query(sql);
    return new Response(JSON.stringify({ 
      success: true, 
      sizes: result.rows 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Server Error', 
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  try {
    const { name } = await req.json();
    const sql = 'INSERT INTO sizes (sizeName) VALUES ($1) RETURNING *';
    const inputs = [name];
    const result = await pool.query(sql, inputs);
    
    return new Response(JSON.stringify({ 
      success: true, 
      size: result.rows[0] 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Server Error', 
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// export async function DELETE(request) {
//   try {
//     const { sizeData } = await request.json();
//     if (!id) {
//       return new Response(JSON.stringify({ success: false, error: 'sizeid is required' }), {
//         status: 400,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }
//     const resQuery = `
//       DELETE from sizes where sizeid=$1 ;
//     `;

//     const result = await pool.query(resQuery,[id]);

//     return new Response(JSON.stringify(result), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {

//     return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }


export async function DELETE(req) {
  try {
    const sizeId=req.url.split("?")[1].split("=")[1];
    const sql = "DELETE FROM sizes WHERE sizeid=$1"; 
    const values = [sizeId];
    const result = await pool.query(sql, values);
    return new Response(JSON.stringify({ 
      success: true, 
      size: result.rows[0] 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Server Error', 
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
