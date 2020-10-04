export default{
    setToken(state, data){
        state.token = data ? data : "";
    },
    setAuth(state, data){
        state.auth = data ? data : "";
    },
}