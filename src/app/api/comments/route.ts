import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/mongodb';
import { Comment } from '@/models/Comment';

// Type to email options
interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

// Send email function
async function sendEmail(options: EmailOptions) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    ...options,
  });
}

export async function GET() {
  try {
    await dbConnect();

    const comments = await Comment.find({ isApproved: true }).sort({
      timestamp: 1,
    });

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

    // Send email to notify the admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: 'Nouveau commentaire à valider - Windows Portfolio',
      text: `Un nouveau commentaire a été posté et nécessite votre validation.
      
<p><strong>Le :</strong> ${new Date() || 'Date inconnue'}</p>    
Auteur: ${body.name || 'Anonyme'}
Commentaire: ${body.content}

Accédez à votre interface d'administration pour le valider.`,
      html: `<h2>Nouveau commentaire à valider</h2>
      <p><strong>Le :</strong> ${new Date() || 'Date inconnue'}</p>
      <p><strong>Auteur :</strong> ${body.name || 'Anonyme'}</p>
      <p><strong>Commentaire :</strong> ${body.content}</p>
      <p>Accédez à votre interface d'administration pour le valider.</p>`,
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Failed to create comment or send notification' },
      { status: 500 },
    );
  }
}
