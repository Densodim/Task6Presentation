import { NextRequest, NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db/db';

export async function GET(
  _: NextRequest,
  { params }: { params: { slideId: string } },
) {
  const [rows]: any = await pool.query(`SELECT * FROM slides WHERE id = ?`, [
    params.slideId,
  ]);
  return rows.length
    ? NextResponse.json(rows[0])
    : NextResponse.json({ error: 'Slide not found' }, { status: 404 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slideId: string } },
) {
  const { slideId } = params;
  const { order, background } = await req.json();
  await pool.query(
    `UPDATE slides SET \`order\` = ?, background = ? WHERE id = ?`,
    [order, background, slideId],
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { slideId: string } },
) {
  const { slideId } = params;
  await pool.query(`DELETE FROM slides WHERE id = ?`, [slideId]);
  return NextResponse.json({ success: true });
}
