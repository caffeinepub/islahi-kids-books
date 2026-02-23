import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Heart, Sparkles, Users } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Welcome to Islahi Kids Books
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Inspiring Young Minds Through{' '}
                <span className="text-primary">Stories</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Discover a world of educational and entertaining Urdu stories designed to nurture curiosity, 
                creativity, and character in children of all ages.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/stories">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Explore Stories
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/hero-reading-kids.dim_1200x600.png"
                alt="Children reading books together"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <img 
                src="/assets/generated/book-mascot.dim_256x256.png" 
                alt="Book Mascot" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Islahi Kids Books, we believe that every child deserves access to quality literature 
              that not only entertains but also educates and inspires. Our carefully curated collection 
              of Urdu stories is designed to foster a love of reading while teaching valuable life 
              lessons, building character, and encouraging personal growth.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Islahi Kids Books?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best reading experience for children and parents alike.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Educational Content</h3>
                <p className="text-muted-foreground">
                  Every story is carefully selected to provide educational value while keeping children engaged and entertained.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Character Building</h3>
                <p className="text-muted-foreground">
                  Our stories emphasize important values like kindness, honesty, courage, and respect for others.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Islamic & Historical</h3>
                <p className="text-muted-foreground">
                  Stories are organized by category to ensure content is suitable and meaningful for each child's learning journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Reading?</h2>
            <p className="text-lg text-muted-foreground">
              Browse our collection of wonderful Urdu stories and find the perfect tale for your child today.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link to="/stories">
                <BookOpen className="mr-2 h-5 w-5" />
                View Our Stories
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
