import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all persons
export async function GET() {
  try {
    const persons = await prisma.person.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(persons);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch persons' }, { status: 500 });
  }
}

// POST create a new person
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, age, address } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'firstName, lastName, and email are required' },
        { status: 400 }
      );
    }

    const person = await prisma.person.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        age: age ? parseInt(age) : null,
        address: address || null,
      },
    });

    return NextResponse.json(person, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create person' }, { status: 500 });
  }
}
