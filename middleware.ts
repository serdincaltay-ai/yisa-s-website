// Panel yollarını sunucu tarafında oturum ile korur; oturum yoksa /giris'e yönlendirir.
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    // Supabase yapılandırılmamışsa paneli yine de kapalı tut: /panel* → /giris
    if (request.nextUrl.pathname.startsWith('/panel')) {
      return NextResponse.redirect(new URL('/giris', request.url))
    }
    return NextResponse.next({ request })
  }

  let response = NextResponse.next({ request })
  const supabase = createServerClient(url, key, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: { path?: string; maxAge?: number; sameSite?: 'lax' | 'strict' | 'none'; secure?: boolean }) {
        response.cookies.set({ name, value, ...options })
      },
      remove(name: string, options: { path?: string }) {
        response.cookies.set({ name, value: '', path: options?.path ?? '/' })
      },
    },
  })

  const { data: { session } } = await supabase.auth.getSession()

  if (request.nextUrl.pathname.startsWith('/panel') && !session?.user) {
    return NextResponse.redirect(new URL('/giris', request.url))
  }

  return response
}

export const config = {
  matcher: ['/panel', '/panel/:path*'],
}
