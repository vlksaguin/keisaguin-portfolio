import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

const AUTH_TOKEN = "Kei:password";
const TABLE = "posts";

// helper
function getId(id: string) {
  const num = Number(id);
  return Number.isInteger(num) && num > 0 ? num : null;
}

async function checkTable() {
  try {
    await pool.query(`SELECT 1 FROM ${TABLE} LIMIT 1`);
    return true;
  } catch {
    return false;
  }
}
async function ensureTableOrFail() {
  const exists = await checkTable();
  if (!exists) {
    return NextResponse.json(
      { message: "Table not initialized. Run init.sql first." },
      { status: 500 }
    );
  }
}
// GET post
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
   const tableError = await ensureTableOrFail();
  if (tableError) return tableError;

  const id = getId(params.id);
  if (!id) return NextResponse.json({ message: "Invalid id" }, { status: 400 });

  try {
    const [rows]: any = await pool.query(
      `SELECT * FROM ${TABLE} WHERE id = ? LIMIT 1`,
      [id]
    );

    if (!rows.length) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch {
    return NextResponse.json({ message: "Error fetching post" }, { status: 500 });
  }
}

// PATCH update
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  
  if (request.headers.get("x-admin-auth") !== AUTH_TOKEN) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const tableError = await ensureTableOrFail();
 if (tableError) return tableError;

  const id = getId(params.id);
  if (!id) return NextResponse.json({ message: "Invalid id" }, { status: 400 });

  const { title, body } = await request.json();

  if (!title || !body) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  try {
    const [result]: any = await pool.query(
      `UPDATE ${TABLE} SET title = ?, body = ? WHERE id = ?`,
      [title, body, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ id, title, body });
  } catch {
    return NextResponse.json({ message: "Error updating" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  if (request.headers.get("x-admin-auth") !== AUTH_TOKEN) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const tableError = await ensureTableOrFail();
 if (tableError) return tableError;

  const id = getId(params.id);
  if (!id) return NextResponse.json({ message: "Invalid id" }, { status: 400 });

  try {
    const [result]: any = await pool.query(
      `DELETE FROM ${TABLE} WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ message: "Error deleting" }, { status: 500 });
  }
}