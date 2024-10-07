// app/api/products/route.js
import { NextResponse } from 'next/server';
import pool from '../../../utils/db';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Received body:", body);

    const now = new Date();
    const addedDate = now.toISOString().split('T')[0];
    const addedTime = now.toTimeString().split(' ')[0];
    const dateObj = new Date(addedDate);

// Add 7 days
dateObj.setDate(dateObj.getDate() + 7);

// Get the new date in YYYY-MM-DD format
const expectedDelivery = dateObj.toISOString().split('T')[0];
    const addedDay = now.toLocaleString('en-US', { weekday: 'long' });

    const results = await Promise.all(body.map(async (eachItem) => {
      const { cartid, productid, userid, quantity, currentprice } = eachItem;

      const sql = `
        INSERT INTO inventoryy (
          cartid, product_id, userid, quantity, selling_price,
          date, time,status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7,'success')
      `;
      const values = [cartid, productid, userid, quantity, currentprice, addedDate, addedTime];
      
      return await pool.query(sql, values);
    }));
    if (results.some(result => result.rowCount>0)) {
      const inventoryresults = await Promise.all(body.map(async (eachItem) => {
        const { cartid, productid, userid, quantity, currentprice } = eachItem;
  
        const sql = `
          INSERT INTO orders (
            cartid, product_id, user_id, qty, price,
            order_date, order_time,mode_of_payment,tax,expected_delivery
          ) VALUES ($1, $2, $3, $4, $5, $6, $7,'COD','0',$8)
        `;
        const values = [cartid, productid, userid, quantity, currentprice, addedDate, addedTime,expectedDelivery];
        
        return await pool.query(sql, values);
      }));
      if (inventoryresults.some(result => result.rowCount>0)){
        console.log("okayyy")
      const cartresults = await Promise.all(body.map(async (eachItem) => {
        const { userid} = eachItem;
        console.log("Processing item:", eachItem);
  
        const sql = `delete from cart where userid=$1 `;
        const values = [userid];
        return await pool.query(sql, values);
      }));
      console.log("call",cartresults)
        }
    }

    //   // If needed, handle further actions like inserting into an orders table
    //   // This part can be uncommented if you need to handle orders
    //   /*
    //   for (const eachItem of body) {
    //     const { userid, productid, quantity, currentprice } = eachItem;
    //     const orderQuery = `
    //       INSERT INTO orders (
    //         user_id, product_id, order_date, mode_of_payment, qty, price, tax, order_time, expected_delivery
    //       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    //     `;
    //     const orderValues = [userid, productid, now, null, quantity, currentprice, null, addedTime, addedDate];
    //     await pool.query(orderQuery, orderValues);
    //   }
    //   */
    // }

    return NextResponse.json({ success: true }, { status: 200 });
   
  } catch (error) {
    console.error("Error in POST request:", error); // Log the error for debugging
    return NextResponse.json({ success: false, error: 'Server Error', details: error.message }, { status: 500 });
  }
}


export async function DELETE(request) {
  try{
    const userid =  request.url.split("?")[1].split("&")[0];
    const productid = request.url.split("&")[1];
    const sql = 'delete from cart where userid=$1 and productid=$2';
    const values=[userid,productid];
    console.log(values,"val");
    const result = await pool.query(sql,values);
    return NextResponse.json({ success: true }, { status: 200 });
    
  }catch(error)
  {
    return NextResponse.json({ success: false, error: 'Server Error', details: error.message }, { status: 500 });
  }
}
