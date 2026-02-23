import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { Story } from '@/backend';

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getCategoryLabel = (category: string) => {
    return category === 'islamic' ? 'Islamic' : 'Historical';
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 group">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors flex-1">
            {story.title}
          </h3>
          <Badge variant="secondary" className="text-xs shrink-0">
            {getCategoryLabel(story.category)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">by {story.authorName}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-4">
          {truncateText(story.description, 180)}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className="w-full" variant="outline">
          <Link to="/stories/$id" params={{ id: story.id.toString() }}>
            <BookOpen className="mr-2 h-4 w-4" />
            Read Story
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
