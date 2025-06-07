import { NextRequest, NextResponse } from 'next/server';
import { pool } from '../../../../lib/db/db';

export const GET = async () => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM presentations ORDER BY created_at DESC',
    );
    const presentation = rows as Presentation[];

    return NextResponse.json({ presentation });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { title, creator_nickname } = await req.json();
    if (!title || !creator_nickname) {
      return NextResponse.json(
        { error: 'Missing required parameter' },
        { status: 400 },
      );
    }
    const [result] = await pool.query(
      'INSERT INTO presentations (title, creator_nickname) VALUES (?, ?)',
      [title, creator_nickname],
    );
    const insertId = (result as any).insertId;
    const newPresentation: Presentation = {
      id: insertId,
      title,
      creator_nickname,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    return NextResponse.json({ newPresentation }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
};

type Presentation = {
  id: string;
  title: string;
  creator_nickname: string;
  created_at: string;
  updated_at: string;
};

export type Params = {
  params: { id: string };
};
