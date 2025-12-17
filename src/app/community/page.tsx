"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  Filter
} from "lucide-react";

const discussions = [
  {
    id: 1,
    title: "What are your top 5 book recommendations for beginners in investing?",
    author: "Rahul M.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    category: "Finance",
    replies: 24,
    likes: 156,
    time: "2 hours ago",
    preview: "I'm new to investing and looking for books that explain the basics in simple terms...",
  },
  {
    id: 2,
    title: "The ending of 'The Silent Patient' - Let's discuss! (Spoilers)",
    author: "Priya S.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    category: "Thriller",
    replies: 89,
    likes: 234,
    time: "5 hours ago",
    preview: "Just finished this book and I'm still processing that twist. Anyone else?",
  },
  {
    id: 3,
    title: "Monthly Reading Challenge - December 2024",
    author: "BookClub Admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    category: "Challenge",
    replies: 156,
    likes: 445,
    time: "1 day ago",
    preview: "This month's theme: Books set during winter! Share your picks and progress here.",
    isPinned: true,
  },
  {
    id: 4,
    title: "Looking for books similar to 'Atomic Habits'",
    author: "Anjali P.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    category: "Self-Help",
    replies: 32,
    likes: 78,
    time: "3 hours ago",
    preview: "I loved how practical Atomic Habits was. Looking for similar actionable reads...",
  },
  {
    id: 5,
    title: "Best Indian authors writing in English?",
    author: "Vikram K.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    category: "Fiction",
    replies: 67,
    likes: 189,
    time: "6 hours ago",
    preview: "Want to explore more Indian literature in English. Recommendations please!",
  },
];

const trendingTopics = [
  { name: "Book Reviews", count: 234 },
  { name: "Reading Tips", count: 189 },
  { name: "Author Discussions", count: 156 },
  { name: "New Releases", count: 143 },
  { name: "Book Swaps", count: 98 },
];

export default function CommunityPage() {
  return (
    <section className="pt-8 pb-20">
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
                  <div className="space-y-4">
                    {discussions.map((discussion, index) => (
                      <motion.div
                        key={discussion.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        className="bg-card border border-border rounded-xl p-5 hover:border-muted-foreground/30 transition-colors cursor-pointer"
                      >
                        {discussion.isPinned && (
                          <Badge variant="secondary" className="mb-3">
                            📌 Pinned
                          </Badge>
                        )}
                        
                        <div className="flex gap-4">
                          <Image 
                            src={discussion.avatar} 
                            alt={discussion.author}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-lg line-clamp-2 hover:text-muted-foreground transition-colors">
                              {discussion.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                              {discussion.preview}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-4 mt-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{discussion.author}</span>
                                <span className="text-muted-foreground">·</span>
                                <span className="text-sm text-muted-foreground">{discussion.time}</span>
                              </div>
                              
                              <Badge variant="outline" className="text-xs">
                                {discussion.category}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
                              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                {discussion.likes}
                              </button>
                              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                {discussion.replies} replies
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
              <Textarea 
                placeholder="What's on your mind?" 
                className="mb-4"
              />
              <Button className="w-full rounded-full gap-2">
                <MessageSquare className="w-4 h-4" />
                Post Discussion
              </Button>
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
