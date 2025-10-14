import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { verifyPassword } from '@/lib/utils/auth-utils'

export async function POST(request: NextRequest) {
  try {
    const { staffCode, password } = await request.json()

    if (!staffCode || !password) {
      return NextResponse.json(
        { error: 'Staff code and password are required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Get staff by code
    const { data: staff, error: staffError } = await supabase
      .from('staff')
      .select('*')
      .eq('staff_code', staffCode.toUpperCase())
      .eq('is_active', true)
      .single()

    if (staffError || !staff) {
      return NextResponse.json(
        { error: 'Invalid credentials or staff account is inactive' },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await verifyPassword(password, staff.password_hash)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create session
    const response = NextResponse.json(
      { 
        success: true,
        user: {
          id: staff.id,
          name: staff.name,
          staffCode: staff.staff_code,
          eventId: staff.event_id,
          role: 'staff'
        }
      },
      { status: 200 }
    )

    // Set cookies
    response.cookies.set('auth-session', staff.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 4, // 4 hours for staff
    })

    response.cookies.set('user-role', 'staff', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 4, // 4 hours for staff
    })

    response.cookies.set('event-id', staff.event_id || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 4,
    })

    return response
  } catch (error) {
    console.error('Staff login error:', error)
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
}

