import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Story, Category } from '@/backend';

export function useStoriesByCategory(category: Category) {
  const { actor, isFetching } = useActor();

  return useQuery<Story[]>({
    queryKey: ['stories', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getStoriesByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}
