import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();

export async function GET()
{
    try{
        const sql = `SELECT users.userid, users.firstname, users.phonenumber, users.email, COUNT(orders.qty) AS order_count FROM users LEFT JOIN orders ON orders.user_id = users.userid GROUP BY users.userid, users.firstname, users.phonenumber, users.email;`
        const response = await pool.query(sql);

        return new Response(JSON.stringify(response.rows),{
            status:200,
            headers:{
                'Content-Type':'application/json'
            }
        })
    }
    catch(error)
    {
        return new Response("error in fetching categories",{
            status:500,
            headers:{
                'Content-Type':'application/json'
            }
        })
    }
}