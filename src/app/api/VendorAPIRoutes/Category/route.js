import dotenv from 'dotenv';
import pool from 'utils/db';
dotenv.config();


// POST CALL FOR CATEGORIES FROM VENDOR -$SAM
export async function POST(req)
{
    try{
        const {categoryName,categoryStatus}=await req.json();
        const row = await pool.query('select * from categories where categoryname = $1',[categoryName.toLowerCase()]);
        //Verifying if category name already exists in database
        if(row.rowCount>0){
            return new Response("Category already exists",{
                status:200,
                headers:{
                    'Content-Type':'application/json'
                }
            })
        }
        else{
            // Adding date with day and time 
            const now = new Date();
            const addedDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
            const addedTime = now.toTimeString().split(' ')[0]; // HH:MM:SS
            const addedDay = now.toLocaleString('en-US', { weekday: 'long' }); // Full day name (e.g., Monday)
            const status = 'active';
            const categoryInsertQuery = "Insert into categories(categoryname,addeddate,addedtime,addedday,status) values($1,$2,$3,$4,$5)";
            const response=await pool.query(categoryInsertQuery,[categoryName.toLowerCase(),addedDate,addedTime,addedDay,status]);
            return new Response("Category Added Successfully",{
                status:200,
                headers:{
                    'Content-Type':'application/json'
                }
            })
        }
        
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
export async function GET()
{
    try{
        const status="active";
        const getCategoriesQuery='select * from categories where status=$1';
        const response = await pool.query(getCategoriesQuery,[status]);
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
        const {id,name}=await req.json();
        const updateQuery="update categories set categoryname=$1 where categoryid=$2";
        const response=await pool.query(updateQuery,[name.toLowerCase(),id]);
        if(response.rowCount>0)
        {//id name not exists in db
            return new Response("Category Updated Successfully",{
                status:200,
                headers:{
                    'Content-Type':'application/json'
                }
            })
        }
        else{//if data already exsits and cannot be updated
            return new Response("Category Already Exsits",{
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
        const deleteQuery="update categories set status='inactive' where categoryid=$1";
        const response=await pool.query(deleteQuery,[id]);
        if(response.rowCount>0)
        {
            return new Response("Category Deleted Successfully",{
                status:200,
                headers:{
                    'Content-Type':'application/json'
                }
            })
        }
        else{
            return new Response("deleted failed Try again ",{
                status:404,
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