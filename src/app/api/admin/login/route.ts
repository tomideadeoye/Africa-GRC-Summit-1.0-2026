import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const expectedUsername = process.env.ADMIN_BASIC_USER || 'admin';
        const expectedPassword = process.env.ADMIN_PASSWORD;

        if (username === expectedUsername && password === expectedPassword) {
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
