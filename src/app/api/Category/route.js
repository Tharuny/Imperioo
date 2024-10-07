import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();



export async function POST(req) {
  try {
    const { name,parent } = await req.json();
    const now = new Date();
    const addedDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const addedTime = now.toTimeString().split(' ')[0]; // HH:MM:SS
    const addedDay = now.toLocaleString('en-US', { weekday: 'long' }); // Full day name (e.g., Monday)

    const sql = `INSERT INTO categories (categoryName, addeddate, addedtime, addedday, status) VALUES ($1, $2, $3, $4, $5)`;
    const inputs = [name, addedDate, addedTime, addedDay, parent];

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


export async function GET(request) {
    const param = request.url.split('?')[1].split('=')[0];
  const stringifiedName = request.url.split('?')[1].split('=')[1];
  let resultString="";
  for(let i=0;i<stringifiedName.length;i++)
  { 
    if(stringifiedName.charAt(i)!='%')
    {
      if(stringifiedName.charAt(i)!='2')
      {
        if(stringifiedName.charAt(i)!='0')
        {
          resultString = resultString + stringifiedName.charAt(i);
        }
      }
    }
    else{
      i=i+2;
      resultString = resultString + " ";

    }
  }
  if (param === "key"){
    try{
      const sql="SELECT categoryname FROM categories WHERE categoryname=$1"; 
      const input = [resultString]
      const result = await pool.query(sql,input);
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
  else if (param === "key2") {
    try {
      const sql="SELECT * FROM categories WHERE status='active' ";
      const result = await pool.query(sql);
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
}

// export async function DELETE(request){
//   const {id}=await request.json();
//   try{
//     const sql = 'DELETE  FROM categories WHERE categoryid=$1';
//     const result = await pool.query(sql,[id]);
//     return new Response(JSON.stringify(result), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
//   catch (error) {
//     return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
  
// }



export async function PUT(request) {
  const id1=request.url.split('?')[2];
  const param = request.url.split('?')[1].split('=')[1];
 if (param === "categorystatus"){
  try {
    const sql="UPDATE categories SET  status='Inactive' WHERE categoryid=$1";
    const inputs = [id1]
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
 }else{
  const editData = request.url.split('?')[1].split('=')[0];
  const id = request.url.split('?')[1].split('=')[1]
  try {
    const sql="UPDATE categories SET  categoryname=$1  WHERE categoryid=$2";
    const inputs = [editData,id]
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
}