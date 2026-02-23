import { useParams, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useStory } from '@/hooks/useStory';

export default function StoryReader() {
  const { id } = useParams({ from: '/stories/$id' });
  const navigate = useNavigate();
  const { data: story, isLoading, error } = useStory(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Skeleton className="h-10 w-32 mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-[600px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button
            variant="ghost"
            onClick={() => navigate({ to: '/stories' })}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Stories
          </Button>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Story not found or failed to load. Please try again.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const pdfUrl = story.pdfBlob.getDirectURL();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/stories' })}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Stories
        </Button>

        {/* Story Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-primary">
            {story.title}
          </h1>
          <p className="text-lg text-muted-foreground">
            by {story.authorName}
          </p>
        </div>

        {/* PDF Viewer */}
        <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border">
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full h-[600px] md:h-[800px]"
            title={story.title}
            sandbox="allow-same-origin allow-scripts"
          />
        </div>

        {/* Story Description */}
        {story.description && (
          <div className="mt-8 bg-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-bold mb-3">About this Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              {story.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
