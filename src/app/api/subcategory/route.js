import { categories } from 'components/search-box/categories';
import dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import pool from 'utils/db';
dotenv.config();

export async function POST(req) {
  try {
    const { subCategoryName, status,parent} = await req.json();

    if (!subCategoryName || !status) {
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
    const sql = `INSERT INTO subcategories(subCategoryname, addeddate, addedtime, addedday, status,categoryid) VALUES ($1, $2, $3, $4, $5,$6)`;
    const inputs = [subCategoryName, addedDate, addedTime, addedDay, status,parent];

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
  const requrl=request.url;
  const param=requrl.split('?')[1].split('=')[1];
  const stringifiedName=requrl.split('?')[1].split('=')[1];
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
  
  if(param==='key'){
    try{
      const sql="SELECT subcategoryname FROM subcategories WHERE subcategoryname=$1"; 
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
  // try {
  //   const resQuery = `
  //     SELECT * from 
  //   `+param
  //   ;

  //   const result = await pool.query(resQuery);

  //   return new Response(JSON.stringify(result.rows), {
  //     status: 200,
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // } catch (error) {

  //   return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
  //     status: 500,
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // }
}
  else if(param==='subcategories'){
    try {
      const resQuery = `SELECT * from subcategories INNER JOIN categories ON subcategories.categoryid=categories.categoryid;
`
      ;
  
      const result = await pool.query(resQuery);
  
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

export async function DELETE(request) {
 
  try {
    const {id} = await request.json();
    const sql = "update subcategories set status = 'inactive' where subcategoryid = $1";
    const result = await pool.query(sql,[id]);
    return new Response("Deleted successfully",{
      status:200,
      headers:{'Content-Type':'application/json'}
    })
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req) {
  try{
    const {id,val} = await req.json();
    const sql = "update subcategories set subcategoryname = $1 where subcategoryid = $2";
    const input = [val,id];
    const result = await pool.query(sql,input);
    if(result.rowCount>0){
      return new Response("SubCategory name Updated successfully",{
        status:200,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    else{
      return new Response("Failed to update subcategory name",{
        status:400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  } catch (error) {
    return new Response(JSON.stringify({error:'error'}),{
      status:500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}