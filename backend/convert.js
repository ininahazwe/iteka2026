const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Dossiers de configuration
const STRAPI_SOURCE_DIR = './strapi-schemas'; // Mettez vos fichiers schema.json ici
const OUTPUT_COLLECTIONS = './content/collections';
const OUTPUT_BLUEPRINTS = './resources/blueprints/collections';

// 1. Création des dossiers si nécessaires
[OUTPUT_COLLECTIONS, OUTPUT_BLUEPRINTS].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// 2. Mapping des types
const typeMap = {
    'string': 'text',
    'email': 'email',
    'text': 'textarea',
    'boolean': 'toggle',
    'datetime': 'date',
    'date': 'date',
    'media': 'assets',
    'richtext': 'bard'
};

// 3. Fonction de conversion
function convertAll() {
    const files = fs.readdirSync(STRAPI_SOURCE_DIR).filter(f => f.endsWith('.json'));

    files.forEach(file => {
        const strapi = JSON.parse(fs.readFileSync(path.join(STRAPI_SOURCE_DIR, file), 'utf8'));

        // On ignore les types qui ne sont pas des collections (ex: composants)
        if (strapi.kind !== 'collectionType') return;

        const handle = strapi.info.singularName.replace(/-/g, '_');
        const title = strapi.info.displayName;

        // Générer la Collection
        const colYaml = { title, revisions: false, route: `/${handle}/{slug}`, sort_dir: 'desc', date: true };
        fs.writeFileSync(path.join(OUTPUT_COLLECTIONS, `${handle}.yaml`), yaml.dump(colYaml));

        // Générer le Blueprint
        const fields = Object.entries(strapi.attributes).map(([key, attr]) => ({
            handle: key,
            field: {
                type: typeMap[attr.type] || 'text',
                display: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
                ...(attr.type === 'media' ? { container: 'assets', max_files: 1 } : {})
            }
        }));

        const blueprintDir = path.join(OUTPUT_BLUEPRINTS, handle);
        if (!fs.existsSync(blueprintDir)) fs.mkdirSync(blueprintDir, { recursive: true });
        fs.writeFileSync(path.join(blueprintDir, `${handle}.yaml`), yaml.dump({ tabs: { main: { sections: [{ fields }] } } }));

        console.log(`✅ ${title} généré.`);
    });
}

convertAll();