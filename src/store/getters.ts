import {GetterTree} from 'vuex'
import {User} from './types'
const getters: GetterTree<any, any> = {
    user(state: any): User {
        return state.user
    }
};

export default getters
