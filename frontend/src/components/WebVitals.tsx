'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { sendGAEvent } from '@next/third-parties/google';

// Envoie les Core Web Vitals (LCP, INP, CLS, FCP, TTFB) à Google Analytics 4.
// Visibles dans GA4 > Rapports > Evénements > "web_vitals".
export default function WebVitals() {
    useReportWebVitals((metric) => {
        if (!process.env.NEXT_PUBLIC_GA_ID) return;
        sendGAEvent('event', 'web_vitals', {
            metric_name: metric.name,
            metric_id: metric.id,
            // CLS est un ratio : on le multiplie pour garder une valeur entière exploitable
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            metric_rating: metric.rating,
            non_interaction: true,
        });
    });
    return null;
}
