import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();


// POST CALL FOR CATEGORIES FROM VENDOR -$SAM
export async function POST(req)
{
    try{
        const {categoryId,subcategoryName,subcategoryStatus}=await req.json();
        // Adding date with day and time 
        const now = new Date();
        const addedDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const addedTime = now.toTimeString().split(' ')[0]; // HH:MM:SS
        const addedDay = now.toLocaleString('en-US', { weekday: 'long' }); // Full day name (e.g., Monday)
        const categoryInsertQuery = "Insert into subcategories(subcategoryname,addeddate,addedtime,addedday,status,categoryid) values($1,$2,$3,$4,$5,$6)";
        const response=await pool.query(categoryInsertQuery,[subcategoryName.toLowerCase(),addedDate,addedTime,addedDay,subcategoryStatus.toLowerCase(),categoryId]);
        return new Response("SubCategory Added Successfully",{
            status:200,
            headers:{
                'Content-Type':'application/json'
            }
        })
    }
    catch(error)
    {
        return new Response(`Category Addition failed'${error}'`,{
            status:500,
            headers:{
                'Content-Type':'application/json'
            }
        })
    }

}

//GET CALL FOR GETTING CATEGORIES FROM VENDOR -$SAM
export async function GET(request)
{
    const id=request.url.split("?")[1].split("=")[1];
    let sql="";
    let values=[];
    if(id=='subcategories')
    {
        sql=`select  subcategories.*,categories.* 
        from subcategories join categories
         on subcategories.categoryid=categories.categoryid where subcategories.status='active'`;
    }
    else{
        sql="SELECT * FROM subcategories where categoryid=$1 and subcategories.status='active'"
        values=[id]
    }
    try{
        const getCategoriesQuery=sql;
        const response = await pool.query(getCategoriesQuery,values);
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


export async function PATCH(req){
    try{
        const {subcategoryid,subcategoryname,categoryKey}=await req.json();
        const updateQuery="update subcategories set subcategoryname=$1 where categoryid=$2 and subcategoryid=$3";
        const response=await pool.query(updateQuery,[subcategoryname.toLowerCase(),categoryKey,subcategoryid]);
        if(response.rowCount>0)
        {//id name not exists in db
            return new Response("udpated Successfully",{
                status:200,
                headers:{
                    'Content-Type':'application/json'
                }
            })
        }
        else{//if data already exsits and cannot be updated
            return new Response("Already Exsits",{
                status:422,
                headers:{
                    'Content-Type':'application/json'
                }
            })
        }    
    }
    catch(error)
    {
        return new Response("Error updating Details From Server",{
            status:500,
            headers:{
                'Content-Type':'application/json'
            }
        })
    }
}

export async function DELETE(req)
{   
    try{
        const id = req.url.split("?")[1].split("=")[1];
        const deleteQuery="update subcategories set status='inactive' where subcategoryid=$1";
        const response=await pool.query(deleteQuery,[id]);
        if(response.rowCount>0)
        {
            return new Response("deleted Successfully",{
                status:200,
                headers:{
                    'Content-Type':'application/json'
                }
            })
        }
        else{
            return new Response("deleted failed Try again ",{
                status:200,
                headers:{
                    'Content-Type':'application/json'
                }
            })
        }
        
    }catch(error)
    {
        return new Response("Deletion of category failed",{
            status:500,
            headers:{
                'Content-Type':'application/json'
            }
        })
    }
}