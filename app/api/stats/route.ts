/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'

export const runtime = 'edge'

async function fetchAllUsersStats() {
  let allDoubloons = 0
  let userCount = 0 
  
  for (let page = 1; page <= 21; page++) {
    const res = await fetch(`https://doubloons.cyteon.hackclub.app/api/v1/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page, sortBy: 'total' })
    })
    
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
    
    const data = await res.json()
    data.users.forEach((user: any) => {
      allDoubloons += user.total_doubloons
      userCount++
    })
  }
  
  return {
    totalDoubloons: allDoubloons,
    totalUsers: userCount,
    timestamp: Date.now()
  }
}

export async function GET() {
  try {
    const stats = await fetchAllUsersStats()

    return new NextResponse(JSON.stringify(stats), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=300',
      },
    })
  } catch (error) {
    console.error('Error in stats endpoint:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
