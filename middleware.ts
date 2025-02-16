import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  return NextResponse.next();
}

// No routes need middleware protection now
export const config = {
  matcher: []
}; 