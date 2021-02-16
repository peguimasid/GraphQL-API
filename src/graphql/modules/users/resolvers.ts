import User from '../../../models/User'
import { ObjectId } from 'mongoose'

interface IUser {
  firstName: string
  lastName: string
  email: string
  active: boolean
}

interface IUserData {
  id: ObjectId
  data: IUser
}

export default {
  User: {
    fullName: ({firstName, lastName}: IUser) => `${firstName} ${lastName}`
  },
  Query: {
    users: () => User.find(),
    findUserBy: (_: unknown, { id }: IUserData) => User.findById(id)
  },
  Mutation: {
    createUser: (_: unknown, { data }: IUserData) => User.create(data),
    updateUser: (_: unknown, { id, data }: IUserData) => User.findByIdAndUpdate(id, data, { new: true }),
    deleteUser: async (_: unknown, { id }: IUserData) => !!(await User.findByIdAndDelete(id))
  }
}
