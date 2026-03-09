import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isAuthorized(request: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;

  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) return false;

  const base64Credentials = authHeader.split(' ')[1];
  if (!base64Credentials) return false;

  let credentials = '';
  try {
    credentials = atob(base64Credentials);
  } catch {
    return false;
  }

  const separatorIdx = credentials.indexOf(':');
  if (separatorIdx === -1) return false;
  const username = credentials.slice(0, separatorIdx);
  const providedPassword = credentials.slice(separatorIdx + 1);
  const expectedUsername = process.env.ADMIN_BASIC_USER || 'admin';

  return username === expectedUsername && providedPassword === password;
}

function unauthorizedResponse(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL('/admin/login', request.url);
  return NextResponse.redirect(url);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page and its resources (including login API)
  if (pathname === '/admin/login' || pathname.startsWith('/admin/login/') || pathname === '/api/admin/login') {
    return NextResponse.next();
  }

  const isAdminPage = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  // Allow GET on config for public consumption
  if (isAdminApi && pathname === '/api/admin/config' && request.method === 'GET') {
    return NextResponse.next();
  }

  // Check for the admin session cookie OR Basic Auth
  const adminCookie = request.cookies.get('admin-session');
  const isCookieAuthorized = adminCookie?.value === process.env.ADMIN_PASSWORD;

  if (!isCookieAuthorized && !isAuthorized(request)) {
    return unauthorizedResponse(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
