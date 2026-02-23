import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import StoryCard from '@/components/StoryCard';
import { useStoriesByCategory } from '@/hooks/useStoriesByCategory';
import { Category } from '@/backend';

export default function Stories() {
  const [activeTab, setActiveTab] = useState<'islamic' | 'historical'>('islamic');

  const { data: islamicStories, isLoading: islamicLoading, error: islamicError } = 
    useStoriesByCategory(Category.islamic);
  
  const { data: historicalStories, isLoading: historicalLoading, error: historicalError } = 
    useStoriesByCategory(Category.historical);

  const currentStories = activeTab === 'islamic' ? islamicStories : historicalStories;
  const currentLoading = activeTab === 'islamic' ? islamicLoading : historicalLoading;
  const currentError = activeTab === 'islamic' ? islamicError : historicalError;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Urdu Stories Library
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of Islamic and historical stories in Urdu
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'islamic' | 'historical')} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="islamic" className="text-base">
              Islamic Stories
            </TabsTrigger>
            <TabsTrigger value="historical" className="text-base">
              Historical Stories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="islamic" className="mt-0">
            <StoryGrid 
              stories={islamicStories || []} 
              loading={islamicLoading} 
              error={islamicError} 
            />
          </TabsContent>

          <TabsContent value="historical" className="mt-0">
            <StoryGrid 
              stories={historicalStories || []} 
              loading={historicalLoading} 
              error={historicalError} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface StoryGridProps {
  stories: any[];
  loading: boolean;
  error: Error | null;
}

function StoryGrid({ stories, loading, error }: StoryGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load stories. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          No stories available in this category yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <StoryCard key={story.id.toString()} story={story} />
      ))}
    </div>
  );
}
