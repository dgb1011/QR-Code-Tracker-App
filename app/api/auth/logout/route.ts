import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear the authentication cookies
  response.cookies.set('auth-session', '', { expires: new Date(0), path: '/' });
  response.cookies.set('user-role', '', { expires: new Date(0), path: '/' });

  return response;
}
