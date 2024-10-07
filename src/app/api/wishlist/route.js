import dotenv from "dotenv";
import pool from "utils/db";
import { NextResponse } from "next/server";
dotenv.config();

// Named export for POST method to add product to wishlist
export async function POST(req) {
  const { userId, productId } = await req.json();
  const now = new Date();
  const addedDate = now.toISOString().split("T")[0]; // YYYY-MM-DD
  const addedTime = now.toTimeString().split(" ")[0]; // HH:MM:SS
  const addedDay = now.toLocaleString("en-US", { weekday: "long" }); // Full day name (e.g., Monday)
  try {
    // Check if the product already exists in the wishlist for the given user
    const checkResult = await pool.query(
      "SELECT * FROM wishlist WHERE productid = $1 AND userid = $2",
      [productId, userId]
    );
    if (checkResult.rows.length > 0) {
      // If the product is already in the wishlist, return a relevant response
      return new NextResponse(checkResult.rows.length, { status: 200 });
    }
    // Insert data into the wishlist table
    const result = await pool.query(
      "INSERT INTO wishlist (productid, userid, quantity, remaining_quantity,addeddate,addedtime,addedday) VALUES ($1, $2, $3, $4,$5,$6,$7)",
      [productId, userId, "20", "120", addedDate, addedTime, addedDay]
    );
    // Send the inserted data back as a response
    return new NextResponse("product added to wishlist", { status: 201 });
  } catch (error) {
    return new NextResponse(
      { error: "Failed to add product to wishlist" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const user = req.url.split("?")[1];
    const resp = "select products.productid,productname,originalprice,currentprice,discount from products join wishlist on products.productid = wishlist.productid where wishlist.userid = $1 and products.status='active';";
    const result = await pool.query(resp, [user]);
    return new NextResponse(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(" Failed to get Data from wishlist " + error, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Named export for DELETE method to remove product from wishlist
export async function DELETE(req) {
  const productId = req.url.split("?")[1];
  const userId = req.url.split("?")[2];

  try {
    // Delete the product from the wishlist
    const result = await pool.query(
      "DELETE FROM wishlist WHERE productid = $1 AND userid = $2",
      [productId, userId]
    );

    if (result.rowCount === 0) {
      return new NextResponse("Product not found in wishlist",
        { status: 404 }
      );
    }

    // Send the deleted data back as a response
    return new NextResponse(result.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove product from wishlist" },
      { status: 500 }
    );
  }
}
