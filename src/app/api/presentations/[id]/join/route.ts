import { NextRequest, NextResponse } from 'next/server';
import { pool } from '../../../../../../lib/db/db';
import { Params } from '@/app/api/presentations/[id]/route';

export const POST = async (req: NextRequest, { params }: Params) => {
  const presentationId = Number(params.id);
  const { nickname } = await req.json();

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

    if ((users as any).length > 0) {
      return NextResponse.json({ role: (users as any[])[0].role });
    }

    await pool.query(
      'INSERT INTO presentation_users (presentation_id, nickname, role) VALUES (?,?,?)',
      [presentationId, nickname, 'viewer'],
    );
    return NextResponse.json({ role: 'viewer' }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: `Server error ${e}` }, { status: 500 });
  }
};
