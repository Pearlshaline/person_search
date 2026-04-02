import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single person
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const person = await prisma.person.findUnique({
      where: { id: parseInt(id) },
    });
    if (!person) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }
    return NextResponse.json(person);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch person' }, { status: 500 });
  }
}

// PUT update a person
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { firstName, lastName, email, phone, age, address } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'firstName, lastName, and email are required' },
        { status: 400 }
      );
    }

    const person = await prisma.person.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        age: age ? parseInt(age) : null,
        address: address || null,
      },
    });

    return NextResponse.json(person);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to update person' }, { status: 500 });
  }
}

// DELETE a person
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.person.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Person deleted successfully' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete person' }, { status: 500 });
  }
}