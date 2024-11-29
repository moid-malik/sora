'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function Comments({ blogId, comments, currentUser }) {
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState(comments);
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPosting(true);
    
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blogId,
          content: newComment,
          userId: currentUser.id.toString()
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        const newCommentWithAuthor = {
          ...data.comment,
          author: currentUser,
          createdAt: new Date().toISOString()
        };
        setLocalComments([...localComments, newCommentWithAuthor]);
        setNewComment('');
      }
    } catch (error) {
      console.log('Error details:', error);
    } finally {
      setIsPosting(false);
    }
};





  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="mb-2"
        />
        <Button 
          type="submit"
          disabled={!newComment.trim() || isPosting}
          className={`${isPosting ? 'bg-gray-700 hover:bg-gray-800' : ''}`}
        >
          {isPosting ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>

      <div className="space-y-4">
      {localComments.map((comment, index) => (
  <div key={index} className="group p-6 border-b border-gray-800 rounded-none hover:border-gray-700 transition-colors">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-200">
            {comment.author?.username?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <span className="font-medium text-gray-200">{comment.author?.username}</span>
          <p className="text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
    <div className="pl-11 -mt-3">
      <p className="text-gray-300 text-sm leading-relaxed">{comment.content}</p>
    </div>
  </div>
))}



      </div>
    </div>
  );
}
