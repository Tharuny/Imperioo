import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();

export async function GET(request) {
  const requrl = request.url;
  const id = requrl.split('?')[1].split('=')[1];
  try {
    const sql = `
         SELECT 
    products.*, 
    ratings.overallrating,
    string_agg(DISTINCT productsizecolors.colorid::text, ', ') AS colorids,
    string_agg(DISTINCT colors.colorname::text, ', ') AS colornames,
    string_agg(DISTINCT colors.colorcode::text, ', ') AS colorcodes,
    string_agg(DISTINCT subquery.specification_combined, ', ') AS specifications
FROM 
    products
JOIN 
    ratings ON products.productid = ratings.productid
JOIN 
    productsizecolors ON productsizecolors.productid = products.productid
JOIN 
    specification ON specification.productid = products.productid
JOIN 
    colors ON colors.colorid = productsizecolors.colorid
JOIN 
    (
        SELECT 
            productid,
            specification_name || ': ' || specification_value AS specification_combined
        FROM 
            specification
        ORDER BY 
            specification_name ASC
    ) AS subquery ON subquery.productid = products.productid
WHERE 
    products.productid =$1 

GROUP BY 
    products.id,
	products.productid,
	products.categoryid,
	products.subcategoryid,
	products.originalprice,
	products.currentprice,
	products.discount,
	products.description,
	products.specification,
	products.addeddate,
	products.addedday,
	products.addedtime,
	products.status,
    ratings.overallrating,
    products.productname;
	


`;
//           SELECT 
//     products.*,
//     string_agg(DISTINCT productsizecolors.colorid::text, ', ') AS colorids,
//     string_agg(subquery.specification_combined, ', ') AS specifications
// FROM 
//     products
// JOIN 
//     specification 
// ON 
//     specification.productid = products.productid
// JOIN 
//     productsizecolors
// ON 
//     productsizecolors.productid = specification.productid
// JOIN 
//     (
//         SELECT 
//             productid,
//             specification_name || ': ' || specification_value AS specification_combined
//         FROM 
//             specification
//         ORDER BY 
//             specification_name ASC
//     ) AS subquery
// ON 
//     subquery.productid = products.productid
// GROUP BY 
//     products.productid;
    const result = await pool.query(sql, [id])
    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  catch (error) {
    return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

}