import pool from 'utils/db';
import dotenv from 'dotenv'
dotenv.config();

export async function POST(request) {
const {emailOrMobile,otp}=await request.json();
try{
  const sql="select otp.otpnumber from otp inner join users on otp.userid=users.userid where users.phonenumber=$1 and otp.otpnumber=$2"
  const result=await pool.query(sql,[emailOrMobile,otp])
  if(result.rowCount > 0)
  {
    return new Response(JSON.stringify("true"));
  }
  else{
    return new Response(JSON.stringify("false"));
  }
}
catch(error){
        return new Response(JSON.stringify({ success: false, error: 'Server Error', details: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
}
}