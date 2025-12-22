
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

interface PostReplyProps {
  postId: string;
}

export function PostReply({ postId }: PostReplyProps) {
  const { user } = useAuth();
  const supabase = createClient();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReply = async () => {
    if (!user) {
      toast.error("You must be logged in to reply.");
      return;
    }
    if (!content.trim()) {
      toast.error("Reply cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from("community_comments").insert({
      post_id: postId,
      user_id: user.id,
      content,
    });

    if (error) {
      toast.error("Failed to post reply", { description: error.message });
    } else {
      setContent("");
      toast.success("Reply posted!");
    }
    setIsSubmitting(false);
  };

  if (!user) {
    return null; // Don't show reply box if not logged in
  }

  return (
    <div className="flex gap-3 pt-4">
      <div className="flex-1">
        <Textarea
          placeholder="Write a reply..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={2}
          className="bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-ring"
        />
        <div className="flex justify-end mt-2">
            <Button size="sm" onClick={handleSubmitReply} disabled={isSubmitting}>
                {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <>
                        Reply <Send className="w-3 h-3 ml-2" />
                    </>
                )}
            </Button>
        </div>
      </div>
    </div>
  );
}
