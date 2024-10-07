import pg from 'pg';
import { NextResponse } from 'next/server';
 
const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = process.env;
 
const pool = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: parseInt(DB_PORT, 10),
});

export async function GET(req) {
    const param=req.url.split("?")[1].split("=")[1];
    let url="";
    let  placeHolders=[];
    if(param=="products")
    {
    url="SELECT products.*,ratings.overallrating FROM products left join ratings on products.productid=ratings.productid where products.status='active'";
    placeHolders=[]
    }
    else
    {
      url="SELECT products.*,ratings.overallrating FROM products left join ratings on products.productid=ratings.productid where products.categoryid=$1";
      placeHolders=[param];
    }
    let result = await pool.query(url,placeHolders);
    return NextResponse.json(result.rows);
}