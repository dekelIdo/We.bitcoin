import { storageService } from '../../services/storage.service'
import { userService } from '../../services/user.service'

export default {
    state: {
        user: userService.getLoggedInUser() || null,
        users: '',
    },

    mutations: {
        setUsers(state, { users }) {
            state.users = users
        },
        setUser(state, { user }) {
            state.user = user
        },

        transferFunds(state, { user }) {
            state.user = user
        },

        logoutUser(state) {
            state.user = null
        }
    },

    actions: {
        async loadUsers(context) {
            const users = await userService.getUsers()
            context.commit({ type: 'setUsers', users })
        },

        async setUser(context, { username }) {
            const user = await userService.login(username)
            context.commit({ type: 'setUser', user })
        },

        async transferFunds(context, { payload }) {
            const user = await userService.transferFunds(payload.fromUser, payload.toUser, payload.amount)
            console.log('userFromStoreNEWWW:', user)
            
            context.commit({ type: 'transferFunds', user})

        },

        async logoutUser(context) {
            userService.logout()
            context.commit({ type: 'logoutUser' })
        }
    },

    getters: {
        users(state) { return state.users },
        user(state) { return state.user }
    }
}