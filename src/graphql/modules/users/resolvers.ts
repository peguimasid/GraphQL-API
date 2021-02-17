import User from '../../../models/User'
import { ObjectId } from 'mongoose'
import { USER_ADDED } from './channels'

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
    createUser: async (_: unknown, { data }: IUserData, { pubsub }: any) => {
      const user = await User.create(data)

      pubsub.publish(USER_ADDED, {
        userAdded: user
      })

      return user
    },
    updateUser: (_: unknown, { id, data }: IUserData) => User.findByIdAndUpdate(id, data, { new: true }),
    deleteUser: async (_: unknown, { id }: IUserData) => !!(await User.findByIdAndDelete(id))
  },
  Subscription: {
    userAdded: {
      subscribe: (obj: any, args: any, { pubsub }: any) => pubsub.asyncIterator(USER_ADDED)
    }
  }
}
