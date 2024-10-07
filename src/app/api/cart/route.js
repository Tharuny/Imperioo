import dotenv from "dotenv";
import pool from "utils/db";
import { NextResponse } from "next/server";
dotenv.config();

// Named export for POST method to add product to wishlist
export async function POST(req) {
  const { userId, id } = await req.json();
  const now = new Date();
  const addedDate = now.toISOString().split("T")[0]; // YYYY-MM-DD
  const addedTime = now.toTimeString().split(" ")[0]; // HH:MM:SS
  const addedDay = now.toLocaleString("en-US", { weekday: "long" }); // Full day name (e.g., Monday)
  try {
    // Check if the product already exists in the wishlist for the given user
    // const checkResult = await pool.query(
    //   "SELECT * FROM cart WHERE productid = $1 AND userid = $2",
    //   [productId, userId]
    // );
    // if (checkResult.rows.length > 0) {
    //   // If the product is already in the wishlist, return a relevant response
    //   return new NextResponse(checkResult.rows.length, { status: 200 });
    // }
    const result = await pool.query(
      "INSERT INTO cart (productid, userid, quantity, remaining_quantity,addeddate,addedtime,addedday) VALUES ($1, $2, $3, $4,$5,$6,$7)",
      [id, userId, "20", "120", addedDate, addedTime, addedDay]
    );
    return new NextResponse("product added to cart", { status: 201 });
  } catch (error) {
    return new NextResponse(
      { error: "Failed to add product to wishlist" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const userId = req.url.split("?")[1];
    const resp = "select products.productid,productname,originalprice,currentprice,discount,quantity from products join cart on products.productid = cart.productid where userid = $1;";
    const result = await pool.query(resp, [userId]);
    return new NextResponse(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(" Failed to get Data from cart " + error, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Named export for DELETE method to remove product from wishlist
export async function DELETE(req) {
  const { productId, userId } = await req.json();

  try {
    // Delete the product from the wishlist
    const result = await pool.query(
      "DELETE FROM wishlist WHERE productId = $1 AND userId = $2 RETURNING *",
      [productId, userId]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Product not found in wishlist" },
        { status: 404 }
      );
    }

    // Send the deleted data back as a response
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove product from wishlist" },
      { status: 500 }
    );
  }
}
