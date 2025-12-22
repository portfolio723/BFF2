
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { CommunityPost } from "@/lib/types";
import { PostReply } from "./PostReply";

interface PostCardProps {
  post: CommunityPost;
}

export function PostCard({ post }: PostCardProps) {
  const [showReplies, setShowReplies] = useState(false);

  const userInitial = post.profiles.full_name?.charAt(0).toUpperCase() || 'U';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-card border border-border rounded-xl p-5"
    >
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src={post.profiles.avatar_url} alt={post.profiles.full_name} />
          <AvatarFallback>{userInitial}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-lg line-clamp-2">
            {post.title}
          </h3>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
            <span className="text-sm font-medium">{post.profiles.full_name}</span>
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm mt-3 whitespace-pre-wrap">
            {post.content}
          </p>

          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ThumbsUp className="w-4 h-4" />
              0
            </button>
            <button 
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowReplies(!showReplies)}
            >
              <MessageCircle className="w-4 h-4" />
              {post.community_comments.length} replies
            </button>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
          
          <AnimatePresence>
            {showReplies && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: '16px' }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="space-y-4 pt-4 border-t border-dashed">
                  {post.community_comments.map(comment => (
                    <div key={comment.id} className="flex gap-3">
                       <Avatar className="w-8 h-8">
                         <AvatarImage src={comment.profiles.avatar_url} alt={comment.profiles.full_name} />
                         <AvatarFallback>{comment.profiles.full_name?.charAt(0) || 'U'}</AvatarFallback>
                       </Avatar>
                       <div className="flex-1 bg-secondary p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                             <span className="font-medium text-sm">{comment.profiles.full_name}</span>
                             <span className="text-xs text-muted-foreground">· {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                          </div>
                          <p className="text-sm mt-1 text-muted-foreground">{comment.content}</p>
                       </div>
                    </div>
                  ))}
                  {post.community_comments.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-2">No replies yet. Be the first to comment!</p>
                  )}
                  <PostReply postId={post.id} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
