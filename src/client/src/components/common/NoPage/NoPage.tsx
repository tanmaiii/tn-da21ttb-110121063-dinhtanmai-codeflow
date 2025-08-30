import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { ArrowLeftIcon, FileTextIcon } from 'lucide-react';
import Link from 'next/link';

export default function NoPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="p-8 text-center w-full h-full min-h-[60vh] flex flex-col items-center justify-center">
        <div className="mb-6 flex flex-col items-center">
          <FileTextIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <TextHeading className="text-2xl font-bold mb-2 text-center">Page not found</TextHeading>
          <TextDescription>The page you are looking for does not exist.</TextDescription>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" asChild className="flex items-center gap-2">
            <Link href="/">
              <ArrowLeftIcon className="w-4 h-4" />
              Back to home
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
