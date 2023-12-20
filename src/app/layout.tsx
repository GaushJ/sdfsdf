"use client"

import { DraftProvider } from '@/context/draftContext';
import '../assets/styles/global.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <DraftProvider>
      <body>{children}</body>
    </DraftProvider>
    </html>
  )
}
