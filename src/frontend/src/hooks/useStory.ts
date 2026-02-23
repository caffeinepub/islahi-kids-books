import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Story } from '@/backend';

export function useStory(id: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Story>({
    queryKey: ['story', id],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getStoryById(BigInt(id));
    },
    enabled: !!actor && !isFetching && !!id,
    retry: false,
  });
}
