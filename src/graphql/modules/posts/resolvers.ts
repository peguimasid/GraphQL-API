import User from '../../../models/User'
import Post from '../../../models/Post'
import { ObjectId } from 'mongoose'

interface IPost {
  title: string
  content: string
  author: ObjectId
}

interface IPostData {
  id: ObjectId
  data: IPost
}

export default {
  Post: {
    author: ({ author }: IPost) => User.findById(author) 
  },
  Query: {
    posts: () => Post.find(),
    findPostBy: (_: unknown, id: string) => Post.findById(id)
  },
  Mutation: {
    createPost: (_: unknown, { data }: IPostData) => Post.create(data),
    updatePost: (_: unknown, { id, data }: IPostData) => Post.findByIdAndUpdate(id, data, { new: true }),
    deletePost: async (_: unknown, { id }: IPostData) => !!(await Post.findByIdAndDelete(id))
  }
}
