// app/api/persons/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const persons = await prisma.person.findMany();
    return NextResponse.json(persons);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to fetch persons from database.' },
      { status: 500 }
    );
  }
}

// Optional: delete a person
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

    await prisma.person.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Failed to delete person.' },
      { status: 500 }
    );
  }
}