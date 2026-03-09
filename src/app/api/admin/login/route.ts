import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        // Use trim() to handle potential whitespace issues from environment variables
        const expectedUsername = (process.env.ADMIN_BASIC_USER || 'admin').trim();
        const expectedPassword = (process.env.ADMIN_PASSWORD || '').trim();

        if (!expectedPassword) {
            console.error('ADMIN_PASSWORD is not set in environment variables');
            return NextResponse.json({ error: 'System configuration error' }, { status: 500 });
        }

        if (username.trim() === expectedUsername && password === expectedPassword) {
            const cookieStore = await cookies();

            // Set the session cookie
            cookieStore.set('admin-session', password, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 1 week
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
