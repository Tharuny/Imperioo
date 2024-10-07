import pool from 'utils/db';
import dotenv from 'dotenv'
dotenv.config();

export async function POST(request) {
    const {email,password}=await request.json();
    const umail=email;
    console.log("umail,password",umail,password)
    try{
        const sql="select * from users where email=$1 and password=$2";
        const result=await pool.query(sql,[umail,password]);
        console.log("result",result.rows)
        const {userid,firstname,lastname,email,phonenumber}= result.rows[0];
        if(result.rowCount > 0)
        {
            const val = {auth:"true",id:userid,name:firstname,lname:lastname,mail:email,phnnumber:phonenumber};
            return new Response(JSON.stringify(val));
        }
        else{
            return new Response(JSON.stringify("false"));
          }
    }catch(error){
        console.error('GET Error:', error);
              return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            });
      }
}