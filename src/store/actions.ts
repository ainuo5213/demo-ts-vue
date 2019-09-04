import {ActionTree} from 'vuex'
import jwt_decode from 'jwt-decode'
import {SET_USER, User} from './types'

const actions: ActionTree<any, any> = {
    async [SET_USER]({state, commit}, user: any) {
        const decodedUser: User = jwt_decode(user);
        commit('SET_USER', decodedUser)
    }
};

export default actions
