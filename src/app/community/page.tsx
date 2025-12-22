
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  MessageSquare, 
  Search,
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
import type { CommunityPost, CommunityComment } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { PostCard } from "@/components/community/PostCard";

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
  const supabase = createClient();

  const [discussions, setDiscussions] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  
  const fetchDiscussions = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('community_posts')
      .select(`
        *,
        profiles ( id, full_name, avatar_url ),
        community_comments ( *, profiles ( id, full_name, avatar_url ) )
      `)
      .order('created_at', { ascending: false })
      .order('created_at', { foreignTable: 'community_comments', ascending: true });

    if (error) {
      toast.error("Failed to fetch discussions", { description: error.message });
    } else {
      setDiscussions(data as CommunityPost[]);
    }
    setIsLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchDiscussions();

    const postChannel = supabase.channel('community-posts-feed')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'community_posts' }, (payload) => {
        // This is a simplified real-time implementation.
        // For a full implementation, you'd fetch the new post with its relations.
        fetchDiscussions(); 
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'community_comments' }, (payload) => {
        // Just refetch all data for simplicity
        fetchDiscussions();
      })
      .subscribe();
      
    return () => {
        supabase.removeChannel(postChannel);
    };
  }, [supabase, fetchDiscussions]);


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
    
    const { error } = await supabase.from('community_posts').insert({
        title: newPostTitle,
        content: newPostContent,
        user_id: user.id
    });
    
    if (error) {
        toast.error("Failed to post discussion", { description: error.message });
    } else {
        toast.success("Your discussion has been posted!");
        setNewPostTitle("");
        setNewPostContent("");
    }
    
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
                <div className="space-y-4">
                  {isLoading ? (
                     <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin" />
                      </div>
                  ) : discussions.length > 0 ? (
                    discussions.map((discussion) => (
                      <PostCard key={discussion.id} post={discussion} />
                    ))
                  ) : (
                    <div className="text-center py-16 lg:py-24 bg-card rounded-2xl border border-dashed">
                        <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h2 className="text-2xl font-bold font-heading">No Discussions Yet</h2>
                        <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                        It's quiet in here. Be the first to start a conversation and get the community talking!
                        </p>
                    </div>
                  )}
                </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Start Discussion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-6 mb-6 sticky top-24"
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
                  rows={4}
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

          </div>
        </div>
      </div>
    </section>
  );
};
