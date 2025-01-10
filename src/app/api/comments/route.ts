import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Comment } from '@/models/Comment';

export async function GET() {
  try {
    await dbConnect();

    const comments = await Comment.find({ isApproved: true })
      .sort({ timestamp: -1 })
      .limit(10);

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const comment = await Comment.create(body);

    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 },
    );
  }
}
