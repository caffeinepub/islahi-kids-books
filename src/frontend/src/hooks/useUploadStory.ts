import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob, Category, Language } from '@/backend';

interface UploadStoryData {
  title: string;
  category: Category;
  language: Language;
  description: string;
  authorName: string;
  pdfFile: Uint8Array;
  onProgress?: (percentage: number) => void;
}

export function useUploadStory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UploadStoryData) => {
      if (!actor) throw new Error('Actor not available');

      // Create a new Uint8Array with proper ArrayBuffer type
      const uint8Array = new Uint8Array(data.pdfFile) as Uint8Array<ArrayBuffer>;

      let pdfBlob = ExternalBlob.fromBytes(uint8Array);
      
      if (data.onProgress) {
        pdfBlob = pdfBlob.withUploadProgress(data.onProgress);
      }

      const storyId = await actor.addStory(
        data.title,
        data.category,
        data.language,
        pdfBlob,
        data.description,
        data.authorName
      );

      return storyId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
    },
  });
}
