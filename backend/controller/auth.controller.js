export const login = async (c) => {
    const body = await c.req.json()
    return c.json({ success: true, user: body })
    }