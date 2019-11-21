import VueRouter from 'vue-router'
import Bar from './../components/Bar'
import Foo from './../components/Foo'

const routes = () => {
    return [
        {
            path: '/foo',
            name: 'bundle.name.foo',
            component: Foo
        },
        {
            path: '/bar',
            name: 'bundle.name.bar',
            component: Bar
        }
    ]
}

const createRouter = () => {
    return new VueRouter({
        mode: 'history',
        routes: routes()
    })      
}

export {
    createRouter,
    routes
}
