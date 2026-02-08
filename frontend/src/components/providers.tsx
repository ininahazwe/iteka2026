// src/components/Providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ReactNode, useState } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
      () =>
          new QueryClient({
            defaultOptions: {
              queries: {
                staleTime: 60 * 1000, // 1 minute
                refetchOnWindowFocus: false,
              },
            },
          })
  );

  return (
      <QueryClientProvider client={queryClient}>
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
        >
          {children}
        </GoogleReCaptchaProvider>
      </QueryClientProvider>
  );
}