// src/store/posts.ts

import { defineStore } from 'pinia'

/* =======================
    INTERFACE
======================= */
interface Comment {
    user: string
    content: string
    createdAt: string
}

export interface Post {
    id: number
    title: string
    content: string
    author: string
    authorId: number
    createdAt: string
    imageUrl?: string
    comments: Comment[]
    // ✅ TRƯỜNG MỚI (Đã có)
    category: string 
    // ✅ TRƯỜNG MỚI: TÍNH NĂNG LIKE
    likedBy: number[] // Lưu danh sách ID người dùng đã thích
    likes: number // Lưu tổng số lượt thích
}

/* =======================
    STORE
======================= */
export const usePostStore = defineStore('posts', {
    state: () => ({
        posts: [] as Post[]
    }),

    /* =======================
        GETTERS
    ======================= */
    getters: {
        // ... (Các getters hiện có giữ nguyên) ...

        // ✅ Lấy toàn bộ bài viết (Sắp xếp theo ID giảm dần/mới nhất)
        getAllPosts: (state) => {
            return [...state.posts].sort((a, b) => b.id - a.id)
        },

        // ✅ Lấy bài viết theo ID
        getPostById: (state) => {
            return (postId: number) => state.posts.find(p => p.id === postId)
        },

        // ✅ Lấy bài viết theo user
        getUserPosts: (state) => {
            return (userId: number) => {
                return state.posts
                    .filter(p => p.authorId === userId)
                    .sort((a, b) => b.id - a.id)
            }
        },

        // ✅ Lấy danh sách các Category duy nhất
        getAllCategories: (state) => {
            const categories = state.posts.map(p => p.category)
            return [...new Set(categories)].filter(c => c && c.trim() !== '') // Loại bỏ trùng lặp và category rỗng
        },

        // ✅ Lọc bài viết theo Category Name
        getPostsByCategory: (state) => {
            return (categoryName: string) => {
                return state.posts
                    .filter(p => p.category.toLowerCase() === categoryName.toLowerCase())
                    .sort((a, b) => b.id - a.id)
            }
        },
        
        // ✅ Lọc bài viết theo Từ khóa Tìm kiếm
        getPostsBySearchTerm: (state) => {
            return (searchTerm: string) => {
                const term = searchTerm ? searchTerm.toLowerCase().trim() : ''
                
                if (!term) {
                    return []
                }
                
                return state.posts
                    .filter(p => {
                        const titleMatch = p.title.toLowerCase().includes(term)
                        const contentMatch = p.content.toLowerCase().includes(term)
                        
                        return titleMatch || contentMatch
                    })
                    .sort((a, b) => b.id - a.id)
            }
        }
    },

    /* =======================
        ACTIONS
    ======================= */
    actions: {
        // ... (Các actions loadPosts, savePosts, addPost, editPost, deletePost, addComment, deleteAllPosts) ...

        loadPosts() {
            const savedPosts = localStorage.getItem('posts')
            if (savedPosts) {
                try {
                    // Cần đảm bảo posts có trường likedBy và likes khi load
                    this.posts = JSON.parse(savedPosts).map((post: Post) => ({
                        ...post,
                        likedBy: post.likedBy || [], // Khởi tạo nếu không tồn tại
                        likes: post.likes || 0      // Khởi tạo nếu không tồn tại
                    }))
                } catch (e) {
                    console.error('Lỗi khi parse posts từ localStorage:', e)
                    this.posts = []
                }
            }
        },
        
        savePosts() {
            localStorage.setItem('posts', JSON.stringify(this.posts))
        },
        
        addPost(post: Post) {
            // Khởi tạo fields mới khi tạo bài viết
            post.likedBy = []
            post.likes = 0
            this.posts.push(post)
            this.savePosts()
        },
        
        editPost(postId: number, updated: Partial<Post>) {
            const post = this.posts.find(p => p.id === postId)
            if (post) {
                Object.assign(post, updated)
                this.savePosts()
            }
        },
        
        deletePost(postId: number) {
            this.posts = this.posts.filter(p => p.id !== postId)
            this.savePosts()
        },
        
        addComment(postId: number, comment: Comment) {
            const post = this.posts.find(p => p.id === postId)
            if (post) {
                post.comments.push(comment)
                this.savePosts()
            }
        },
        
        // ✅ ACTION MỚI: Toggle Like/Unlike
        toggleLike(postId: number, userId: number) {
            const post = this.posts.find(p => p.id === postId)
            if (post) {
                // Đảm bảo likedBy tồn tại
                if (!post.likedBy) {
                    post.likedBy = []
                }

                const userIndex = post.likedBy.indexOf(userId)

                if (userIndex === -1) {
                    // Chưa thích -> Thêm (LIKE)
                    post.likedBy.push(userId)
                    post.likes = (post.likes || 0) + 1
                } else {
                    // Đã thích -> Xóa (UNLIKE)
                    post.likedBy.splice(userIndex, 1)
                    post.likes = (post.likes || 1) - 1
                }
                
                this.savePosts()
            }
        },
        
        deleteAllPosts() {
            this.posts = []
            this.savePosts()
            console.log('✅ Đã xóa toàn bộ bài viết!')
        }
    }
})