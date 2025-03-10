import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const path = req.nextUrl.pathname
      
      // Public paths that don't require authentication
      const publicPaths = ['/', '/signin', '/signup', '/how-it-works']
      if (publicPaths.includes(path)) return true
      
      // All other paths require authentication
      return !!token
    }
  }
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
