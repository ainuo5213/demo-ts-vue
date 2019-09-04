import {MutationTree} from 'vuex'
import {SET_USER, User, SET_ROUTERS} from './types'
const mutations: MutationTree<any> = {
    [SET_USER](state: any, user: User): void{
        state.user = user
    },
    [SET_ROUTERS](state: any, routers: any): void{
        state.user = routers
    },
};

export default mutations
