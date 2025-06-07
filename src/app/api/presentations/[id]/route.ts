import { NextRequest, NextResponse } from 'next/server';
import { pool } from '../../../../../lib/db/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const presentationId = parseInt(params.id, 10);

  const { searchParams } = new URL(req.url);
  const nickname = searchParams.get('nickname');

  if (!nickname) {
    return NextResponse.json(
      { error: 'Nickname is required' },
      { status: 400 },
    );
  }

  try {
    const [users] = await pool.query(
      'SELECT role FROM presentation_users WHERE presentation_id = ? AND nickname = ?',
      [presentationId, nickname],
    );

    if ((users as any[]).length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ role: (users as any[])[0].role });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
