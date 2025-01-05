import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, sortBy } = body;

    const response = await fetch(
      `https://doubloons.cyteon.hackclub.app/api/v1/search?username=${username}&sortBy=${sortBy}`,
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
