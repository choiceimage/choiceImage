import { Hono } from 'hono'
import authRoutes from './auth.routes.js'
import userRoutes from './user.routes.js'


export const routes = new Hono()


routes.route('/auth', authRoutes)
routes.route('/users', userRoutes)