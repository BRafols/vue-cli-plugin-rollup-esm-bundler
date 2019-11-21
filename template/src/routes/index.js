export default routes = () => {
    return [
        {
            path: '/foo',
            name: 'bundle.name.foo',
            component: {
                template: '<span>Foo</span>'
            }
        },
        {
            path: '/bar',
            name: 'bundle.name.bar',
            component: {
                template: '<span>Bar</span>'
            }
        }
    ]
}