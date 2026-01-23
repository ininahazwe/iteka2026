module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'crm_journaliste'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'postgres'),
      ssl: env.bool('DATABASE_SSL', false),
    },
    useNullAsDefault: true,
  },
});