import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

const AUTH_TOKEN = "Kei:password";
const TABLE = "posts";

// --- helpers ---

function isAuthorized(req: NextRequest) {
  return req.headers.get("x-admin-auth") === AUTH_TOKEN;
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

// --- GET all posts ---
export async function GET() {
  const tableError = await ensureTableOrFail();
  if (tableError) return tableError;

  try {
    const [rows]: any = await pool.query(
      `SELECT id, title, body FROM ${TABLE} ORDER BY id DESC`
    );

    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ message: "Error fetching posts" }, { status: 500 });
  }
}

// --- CREATE post ---
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const tableError = await ensureTableOrFail();
  if (tableError) return tableError;

  const { title, body } = await request.json();

  if (!title || !body) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  try {
    const [result]: any = await pool.query(
      `INSERT INTO ${TABLE} (title, body) VALUES (?, ?)`,
      [title, body]
    );

    return NextResponse.json(
      { id: result.insertId, title, body },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ message: "Error creating post" }, { status: 500 });
  }
}