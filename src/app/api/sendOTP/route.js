import { NextResponse } from 'next/server';
import pool from 'utils/db';
import dotenv from 'dotenv';
dotenv.config();
 
export async function POST(request) {
  console.log("POST is called");
  const emailOrMobile = await request.json();
 
  try {
    const sql = "SELECT * FROM users WHERE phonenumber=$1";
    const result = await pool.query(sql, [emailOrMobile]);
    console.log("User rows", result.rows);
   
    if (result.rowCount > 0) {
      console.log("First if block entered");
     
      const validuserid = result.rows[0].userid;
      const otp = Math.floor(10000 + Math.random() * 90000);
     
      const insertOtpSql = "INSERT INTO otp(otpnumber, userid) VALUES($1, $2)";
      const result1 = await pool.query(insertOtpSql, [otp, validuserid]);
      console.log("Result1 rowCount", result1.rowCount);
     
      if (result1.rowCount > 0) {
        console.log("Second if block entered");
       
        const result2 = await pool.query("SELECT otpnumber FROM otp ORDER BY id DESC LIMIT 1");
        console.log(result2.rows);
       
        return new Response(JSON.stringify({ success: "true", otp: result2.rows[0].otpnumber }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else {
      return new Response(JSON.stringify("false"), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}