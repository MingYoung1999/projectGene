export default{
    setToken({ commit }, data){
        commit('setToken', data);
    },
    setAuth({ commit }, data){
        commit('setAuth', data);
    },
}