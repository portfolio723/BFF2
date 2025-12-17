import Image from "next/image";
import { communityPosts } from "@/lib/data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight">
            Community Hub
          </h1>
          <p className="text-muted-foreground mt-2">
            Connect with fellow readers in Hyderabad.
          </p>
        </div>
        <Button className="mt-4 md:mt-0">Start a New Discussion</Button>
      </header>
      <div className="space-y-6">
        {communityPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <div className="flex items-center gap-2 pt-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={post.author.avatar.url}
                    alt={post.author.name}
                    data-ai-hint={post.author.avatar.hint}
                  />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {post.timestamp}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{post.content}</p>
            </CardContent>
            <CardFooter>
                <div className="flex items-center text-sm text-muted-foreground">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>{post.replies} replies</span>
                </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
