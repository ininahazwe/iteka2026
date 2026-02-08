// src/components/Providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ReactNode, useState, useEffect } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
      () =>
          new QueryClient({
            defaultOptions: {
              queries: {
                staleTime: 60 * 1000,
                refetchOnWindowFocus: false,
              },
            },
          })
  );

  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Debug: afficher la clé dans la console (RETIRE ÇA APRÈS DEBUG)
  useEffect(() => {
    console.log('reCAPTCHA Key:', recaptchaKey);
  }, [recaptchaKey]);

  return (
      <QueryClientProvider client={queryClient}>
        {recaptchaKey ? (
            <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
              {children}
            </GoogleReCaptchaProvider>
        ) : (
            <>
              <div style={{ padding: '20px', background: 'red', color: 'white' }}>
                ERREUR: NEXT_PUBLIC_RECAPTCHA_SITE_KEY non définie
              </div>
              {children}
            </>
        )}
      </QueryClientProvider>
  );
}