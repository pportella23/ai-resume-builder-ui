import { NextRequest, NextResponse } from 'next/server'
import { mockUser } from '@/lib/mock-data'

// Use mock mode if NEXT_PUBLIC_USE_MOCK is set to 'true' or if API URL is not configured
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || !process.env.NEXT_PUBLIC_API_URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Mock registration
    if (USE_MOCK) {
      return NextResponse.json({
        success: true,
        data: {
          user: {
            ...mockUser,
            id: `user-${Date.now()}`,
            email,
            name,
          },
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
        },
        message: 'User registered successfully',
      }, { status: 201 })
    }

    // Real API registration
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: error.message || 'Registration failed' },
      { status: 500 }
    )
  }
} 