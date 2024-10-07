import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();

export async function POST(request){
    const {first_name,last_name,email,phone_number,password}=await request.json();
    try{
        const insertsql="insert into users(firstname,lastname,email,phonenumber,password,status) values($1,$2,$3,$4,$5,'Active')"
        const result=await pool.query(insertsql,[first_name,last_name,email,phone_number,password])
        if(result.rowCount > 0){
        return new Response(JSON.stringify("true"), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }
        else
        {
          return new Response(JSON.stringify("false"), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        }
    }
    catch(error)
    {
        console.error('GET Error:', error);
        return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
}