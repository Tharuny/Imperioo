import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();

export async function POST(req) {
  try {

    const { 
      invoicenumber, 
      invoiceid,
      productid,
      productname,
      remainingquantity,
      marginprice,
      originalprice,
      discount,
      profit,
      sellingprice,
      quantity
    } = await req.json();

    if (!invoicenumber || !productname || !remainingquantity || !marginprice || !originalprice || !discount || !profit || !sellingprice || !quantity) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const query = 'INSERT INTO invoice_details (invoicenumber,invoiceid,productid,productname,remainingquantity,marginprice,originalprice,discount,profit,sellingprice,quantity) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
    const input = [invoicenumber,invoiceid,productid,productname,remainingquantity,marginprice,originalprice,discount,profit,sellingprice,quantity];
    const response = await pool.query(query, input);


    // Execute the query
    

 
    
    
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

// export async function GET(request) {
//   try {
//     // const resUrl=request.url.split('?')[1].split('=')[1];
//     const resUrl=request.url.split('?')[1].split('=');
//     const Load="SELECT * FROM invoices order by id desc limit 10";
//     // let updated="select * from invoices order by id desc limit 1";
//     // let resQuery = (resUrl === "onLoad") ? Load : updated;

//     const result = await pool.query(Load);
//     return new Response(JSON.stringify(result.rows), {
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
