import { jwtDecode } from 'jwt-decode';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { IUser } from './interfaces/user';
const intlMiddleware = createMiddleware(routing);

const publicPaths = ['/login', '/register', '/forgot-password', '/join-org', '/reset-password'];
const publicPathsWithAuth = ['/post']; // Paths that allow both authenticated and unauthenticated users

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken');
  const { pathname } = req.nextUrl;
  let user: IUser | null = null; // Khởi tạo user là null

  const localeMatch = pathname.match(/^\/(en|vi|ja|cp)/);
  const localePrefix = localeMatch ? localeMatch[0] : '/en';

  const isPublicPath = publicPaths.some(path => pathname.startsWith(`${localePrefix}${path}`));
  const isPublicPathWithAuth = publicPathsWithAuth.some(path =>
    pathname.startsWith(`${localePrefix}${path}`),
  );

  if (!token && !isPublicPath && !isPublicPathWithAuth && !pathname.startsWith('/api')) {
    return NextResponse.redirect(new URL(`${localePrefix}/login`, req.url));
  }

  if (token) {
    try {
      const res = jwtDecode<{
        user: IUser;
      }>(token.value);
      user = res.user;
    } catch (error) {
      console.error('Invalid token', error);
    }
  }

  // Nếu đã có token mà vào login/register/forgot-password/join-org → đá về home
  if (token && isPublicPath && !isPublicPathWithAuth) {
    return NextResponse.redirect(new URL(`${localePrefix}/`, req.url));
  }

  // Chặn truy cập /admin nếu không phải admin
  if (pathname.startsWith(`${localePrefix}/admin`) && (!user || user?.role != 'admin')) {
    return NextResponse.redirect(new URL(`${localePrefix}/`, req.url));
  }

  // Nếu user là admin và đang truy cập trang chủ, tự động redirect sang /admin
  if (user && user.role === 'admin' && pathname === `${localePrefix}`) {
    return NextResponse.redirect(new URL(`${localePrefix}/admin`, req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
