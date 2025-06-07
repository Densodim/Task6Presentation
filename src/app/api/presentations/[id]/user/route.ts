import { NextRequest, NextResponse } from 'next/server';
import { pool } from '../../../../../../lib/db/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const presentationId = Number(params.id);
  const { searchParams } = new URL(req.url);
  const nickname = searchParams.get('nickname');

  if (!nickname) {
    return NextResponse.json(
      { error: 'Nickname is required' },
      { status: 400 },
    );
  }

  try {
    const [rows] = await pool.query(
      'SELECT role FROM presentation_users WHERE presentation_id = ? AND nickname = ?',
      [presentationId, nickname],
    );

    const users = rows as { role: string }[];

    if (users.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ role: users[0].role }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
