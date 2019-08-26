import {MutationTree} from 'vuex'
import {SET_USER, User} from './types'
const mutations: MutationTree<any> = {
    [SET_USER](state: any, user: User): void{
        state.user = user
    }
};

export default mutations
