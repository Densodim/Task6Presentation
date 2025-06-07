import { NextRequest, NextResponse } from 'next/server';
import { pool } from '../../../../../../lib/db/db';

export async function POST(
  req: NextRequest,
  { params }: { params: { slideId: string } },
) {
  const slideId = parseInt(params.slideId, 10);
  if (!slideId) {
    return NextResponse.json({ error: 'Invalid slideId' }, { status: 400 });
  }

  try {
    const { type, content, style, position_x, position_y } = await req.json();

    if (!['text', 'shape', 'image'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 },
      );
    }

    const [result]: any = await pool.query(
      `INSERT INTO elements (slide_id, type, content, style, position_x, position_y) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        slideId,
        type,
        JSON.stringify(content),
        style ? JSON.stringify(style) : null,
        position_x || 0,
        position_y || 0,
      ],
    );

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: `Failed to create element: ${e}` },
      { status: 500 },
    );
  }
}
