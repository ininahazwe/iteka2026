export function OrganizationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Iteka Youth Organization",
        "url": process.env.NEXT_PUBLIC_SITE_URL,
        "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
        "description": "Empowering Rwandan youth through talent discovery, skills development, and peace promotion",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "RW",
            "addressLocality": "Kigali"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}