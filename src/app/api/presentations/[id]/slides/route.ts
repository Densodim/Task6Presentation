import { NextRequest, NextResponse } from 'next/server';

import { pool } from '../../../../../../lib/db/db';
import { Params } from '@/app/api/presentations/route';

export const POST = async (req: NextRequest, { params }: Params) => {
  try {
    const { id } = params;
    const { order, background } = await req.json();
    const [result]: any = await pool.query(
      'INSERT INTO slides (presentation_id, `order`, background) VALUES (?,?,?)',
      [id, order, background],
    );
    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: `Failed to create slide: ${e}` },
      { status: 500 },
    );
  }
};

export const GET = async (_: NextRequest, { params }: Params) => {
  try {
    const { id } = params;
    const [rows] = await pool.query(
      'SELECT * FROM slides WHERE presentation_id = ? ORDER BY `order` ASC',
      [id],
    );
    return NextResponse.json({ rows });
  } catch (e) {
    return NextResponse.json(
      { error: `Failed to fetch slides ${e}` },
      { status: 500 },
    );
  }
};
