export const authMiddleware = async (c, next) => {
    const token = c.req.header('authorization')
    if (!token) {
    return c.json({ error: 'Unauthorized' }, 401)
    }
    await next()
    }