import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    const response = await fetch(
      `https://doubloons.cyteon.hackclub.app/api/v1/graph?id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 0 }
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' }, 
      { status: 500 }
    );
  }
}