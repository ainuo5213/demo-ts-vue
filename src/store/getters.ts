import {GetterTree} from 'vuex'
import {User} from './types'
const getters: GetterTree<any, any> = {
    user(state: any): User {
        return state.user
    },
    routers(state: any): User {
        return state.routers
    }
};

export default getters
