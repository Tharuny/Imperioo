import dotenv from 'dotenv';
import { success } from 'theme/theme-colors';
import pool from 'utils/db';
dotenv.config();


export async function POST(req)
{
    try{
        const prodId=req.url.split("?")[1].split("=")[1].split("&")[0];
        const overalRating=req.url.split("?")[1].split("&")[1].split("=")[1];
        const sql='update ratings set overallrating=$1 where productid=$2';
        const result=await pool.query(sql,[overalRating,prodId]);
        if(result.rowCount){
            return new Response(JSON.stringify({success:true}),{
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
        return new Response(JSON.stringify({success:false}),{
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    catch(error)
    {
        return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
    }

}

export async function GET(req){
    try{
        const prodId=req.url.split("?")[1].split("=")[1];
        const sql="select overallrating from ratings where productid=$1";
        const result=await pool.query(sql,[prodId]);

        const log= result.rows[0].overallrating;
        return new Response(log,{
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
    }
    catch(error)
    {
        return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
    }
}