import { defineStore } from 'pinia'

interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  comments: { user: string, content: string, createdAt: string }[]
}

export const usePostStore = defineStore('posts', {
  state: () => ({
    posts: [] as Post[]
  }),
  actions: {
    addPost(post: Post) {
      this.posts.push(post)
    },
    addComment(postId: number, comment: { user: string, content: string, createdAt: string }) {
      const post = this.posts.find(p => p.id === postId)
      if (post) post.comments.push(comment)
    }
  }
})
