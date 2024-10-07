import pool from '../../../utils/db';

export async function GET(request) {
    try{
        const sql="SELECT p.*,c.categoryid,c.categoryname,s.subcategoryid,s.subcategoryname,p.currentprice FROM products p JOIN subcategories s ON p.subcategoryid = s.subcategoryid JOIN categories c ON s.categoryid = c.categoryid";
        const result=await pool.query(sql);
        return new Response(JSON.stringify(result.rows))
    }
    catch(error){
        return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }))
    }
}

export async function DELETE(request){
    const {id}=await request.json();
    try{
        const sql = 'DELETE  FROM products WHERE productid=$1';
        const result = await pool.query(sql,[id]);
        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      catch(error)
      {
        return new Response(JSON.stringify(error))
      }
}