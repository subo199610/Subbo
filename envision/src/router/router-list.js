import router_s from '../router/router-s.js'
import router_z from '../router/router-z.js'
import router_x from '../router/router-x.js'
import router_d from '../router/router-d.js'
import router_l from '../router/router-l.js'

let routerList=[
    ...router_s.routes,
    ...router_z.routes,
    ...router_x.routes,
    ...router_d.routes,
    ...router_l.routes
];
export default routerList