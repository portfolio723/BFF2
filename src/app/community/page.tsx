
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageSquare, 
  Search, 
  ThumbsUp, 
  MessageCircle,
  Share2,
  Bookmark,
  TrendingUp,
  Clock,
  Filter,
  LogIn,
  Loader2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CommunityPost } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { communityPosts as allPosts } from "@/lib/data";

const trendingTopics = [
  { name: "Book Reviews", count: 234 },
  { name: "Reading Tips", count: 189 },
  { name: "Author Discussions", count: 156 },
  { name: "New Releases", count: 143 },
  { name: "Book Swaps", count: 98 },
];

export default function CommunityPage() {
  const { user } = useAuth();
  const pathname = usePathname();

  const [discussions, setDiscussions] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);
    setDiscussions(allPosts);
    setIsLoading(false);
  }, []);

  const handlePostDiscussion = async () => {
    if (!user) {
      toast.error("Please sign in to start a discussion.");
      return;
    }

    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast.error("Both title and content are required.");
      return;
    }

    setIsPosting(true);
    
    // This would be where you call your new backend
    toast.success("Your discussion has been posted!");
    
    const newPost: CommunityPost = {
      id: `mock-post-${Date.now()}`,
      title: newPostTitle,
      content: newPostContent,
      created_at: new Date().toISOString(),
      user_id: user.id,
      profiles: {
        full_name: "You",
        avatar_url: ""
      }
    }

    setDiscussions([newPost, ...discussions]);
    setNewPostTitle("");
    setNewPostContent("");
    
    setIsPosting(false);
  };

  return (
    <section className="pb-20 pt-12">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Join the Conversation
          </div>
          <h1 className="font-heading text-3xl lg:text-4xl font-semibold">
            Community Discussions
          </h1>
          <p className="text-muted-foreground mt-3">
            Connect with fellow book lovers, share recommendations, and engage in meaningful discussions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex gap-3 mb-6"
            >
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search discussions..." 
                  className="pl-11 h-12 bg-secondary border-0"
                />
              </div>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Filter className="w-4 h-4" />
              </Button>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 mb-6">
                  <TabsTrigger 
                    value="all"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 pb-3"
                  >
                    All Discussions
                  </TabsTrigger>
                  <TabsTrigger 
                    value="trending"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 pb-3"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trending
                  </TabsTrigger>
                  <TabsTrigger 
                    value="recent"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 pb-3"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Recent
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  {isLoading ? (
                     <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin" />
                      </div>
                  ) : discussions.length > 0 ? (
                  <div className="space-y-4">
                    {discussions.map((discussion, index) => (
                      <motion.div
                        key={discussion.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        className="bg-card border border-border rounded-xl p-5 hover:border-muted-foreground/30 transition-colors cursor-pointer"
                      >
                        <div className="flex gap-4">
                          <Avatar>
                            <AvatarImage src={discussion.profiles.avatar_url} alt={discussion.profiles.full_name} />
                             <AvatarFallback>{discussion.profiles.full_name?.charAt(0) || 'U'}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-lg line-clamp-2 hover:text-muted-foreground transition-colors">
                              {discussion.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                              {discussion.content}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-4 mt-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{discussion.profiles.full_name}</span>
                                <span className="text-muted-foreground">·</span>
                                <span className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(discussion.created_at), { addSuffix: true })}</span>
                              </div>
                              
                              <Badge variant="outline" className="text-xs">
                                General
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
                              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                0
                              </button>
                              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                0 replies
                              </button>
                              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <Share2 className="w-4 h-4" />
                                Share
                              </button>
                              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto">
                                <Bookmark className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  ) : (
                    <div className="text-center py-16 lg:py-24 bg-card rounded-2xl border border-dashed">
                        <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h2 className="text-2xl font-bold font-heading">No Discussions Yet</h2>
                        <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                        It's quiet in here. Be the first to start a conversation and get the community talking!
                        </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="trending">
                  <p className="text-muted-foreground text-center py-8">
                    Trending discussions coming soon...
                  </p>
                </TabsContent>
                
                <TabsContent value="recent">
                  <p className="text-muted-foreground text-center py-8">
                    Recent discussions coming soon...
                  </p>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Start Discussion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-6 mb-6"
            >
              <h3 className="font-heading text-lg font-semibold mb-4">
                Start a Discussion
              </h3>
              <div className="space-y-4">
                <Input
                  placeholder="Discussion Title"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  disabled={!user || isPosting}
                />
                <Textarea 
                  placeholder="What's on your mind?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  disabled={!user || isPosting}
                />
              </div>

              {user ? (
                <Button className="w-full rounded-full gap-2 mt-4" onClick={handlePostDiscussion} disabled={isPosting}>
                  {isPosting ? <Loader2 className="animate-spin"/> : <MessageSquare className="w-4 h-4" />}
                  {isPosting ? "Posting..." : "Post Discussion"}
                </Button>
              ) : (
                <Button asChild className="w-full rounded-full gap-2 mt-4">
                  <Link href={`/auth?redirect=${pathname}`}>
                    <LogIn className="w-4 h-4" />
                    Sign in to Post
                  </Link>
                </Button>
              )}
            </motion.div>

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-card border border-border rounded-xl p-6 mb-6"
            >
              <h3 className="font-heading text-lg font-semibold mb-4">
                Trending Topics
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <div 
                    key={topic.name}
                    className="flex justify-between items-center py-2 border-b border-border last:border-0 cursor-pointer hover:text-muted-foreground transition-colors"
                  >
                    <span className="text-sm font-medium"># {topic.name}</span>
                    <span className="text-xs text-muted-foreground">{topic.count} posts</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Community Guidelines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-secondary/50 rounded-xl p-6"
            >
              <h3 className="font-heading text-lg font-semibold mb-3">
                Community Guidelines
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Be respectful and supportive</li>
                <li>• No spam or self-promotion</li>
                <li>• Use spoiler warnings when needed</li>
                <li>• Keep discussions book-related</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
