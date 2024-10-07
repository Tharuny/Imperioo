import pool from 'utils/db' //connecting with db details in pool 
import dotenv from 'dotenv' //configuring  db details 
import { request } from 'http';
dotenv.config();


export async function POST(req)
{
    const {email,password}=await req.json();

    try{
        const sqlQuery="select * from admin where adminmail=$1 and adminpassword=$2 ";
        const result=await pool.query(sqlQuery,[email,password])
        if(result.rowCount>0)  {
            // count=1;
            return new Response(JSON.stringify({bool:"true",msg:""}));
        }
        else if(result.rowCount==0)
        {
            // count=0;
            return new Response(JSON.stringify({bool:"false",msg:"check the username and password"}));
        }
        
    }
    catch(error){
        return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }));
    }
}
