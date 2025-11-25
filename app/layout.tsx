import type React from "react"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import Navbar from "@/components/navbar"

// Note: This is a temporary solution. For metadata, the layout should be a Server Component.
// If you need metadata, create a separate root layout that's a server component.

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
