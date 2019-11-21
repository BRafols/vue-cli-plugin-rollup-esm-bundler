import Vuex from 'vuex'

const createModule = () => {
    return {
        namespaced: true,
        state: {
            count: 0
        },
        actions: {
            INCREMENT: (context) => {
                const { commit } = context
                commit('INCREMEMENT')
            },
            DECREMENT: (context) => {
                const { commit } = context
                commit('DECREMENT')
            },
            RESET: (context) => {
                const { commit } = context
                commit('RESET')
            },            
        },
        mutations: {
            INCREMENT: (state) => {
                state.count = ++state.count
            },
            DECREMENT: (state) => {
                state.count = --state.count
            },
            RESET: (state) => {
                state.count = 0
            },
        },
        getters: {}
    }
}

const createStore = () => {
    return new Vuex.Store({
        state: {},
        actions: {},
        mutations: {},
        modules: {
            trovimap: createModule()
        }
    })
}

export {
    createModule,
    createStore
}