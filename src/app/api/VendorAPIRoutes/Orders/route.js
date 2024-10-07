import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();

export async function GET(request)
{
    console.log("hello");
    try{
        console.log(request.url,"final orders");
        let getOrdersQuery="";
        let response="";
        if(request.url.split("?")[1].length==0){
             getOrdersQuery = 'SELECT users.firstname,products.productname,orders.qty,orders.price, orders.expected_delivery FROM orders JOIN users ON users.userid = orders.user_id JOIN products ON products.productid = orders.product_id';
             response = await pool.query(getOrdersQuery);
        }
        else
        {
            console.log("hello",request.url.split("?")[1]);
            getOrdersQuery = 'SELECT users.firstname,products.productname,orders.qty,orders.price, orders.expected_delivery FROM orders JOIN users ON users.userid = orders.user_id JOIN products ON products.productid = orders.product_id where orders.user_id=$1';
            response = await pool.query(getOrdersQuery,[request.url.split("?")[1]]);
        }
        // const response = await pool.query(getOrdersQuery);
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