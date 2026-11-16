// src/lib/prefetch.ts
// Préchargement côté serveur : les données arrivent dans le HTML initial (SEO)
// puis sont réhydratées par React Query côté navigateur.
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { queries, type QueryName } from './queries';

export async function dehydratedState(names: QueryName[]) {
  const queryClient = new QueryClient();
  // prefetchQuery n'échoue jamais : si WordPress est injoignable, la page se
  // rabat sur le chargement côté navigateur comme avant.
  await Promise.all(
    names.map((name) =>
      queryClient.prefetchQuery(
        queries[name] as { queryKey: readonly unknown[]; queryFn: () => Promise<unknown> }
      )
    )
  );
  return dehydrate(queryClient);
}
