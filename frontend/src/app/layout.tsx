// app/layout.tsx
import './globals.css';
import Providers from "@/src/components/providers";

export const metadata = {
    title: 'Iteka Youth Organization',
    description: 'Empowering Rwanda\'' +
        's youth',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}