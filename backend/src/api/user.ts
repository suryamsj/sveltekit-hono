import { Hono } from "hono";
import { validator } from 'hono/validator'
import prisma from "../lib/prisma";
import userValidation from "../validation/user.schema";

const app = new Hono();

// GET ALL DATA USERS
app.get("/", async (c) => {
    try {
        const { page = 1, limit = 5 } = c.req.query();
        const users = await prisma.users.findMany({
            orderBy: {
                created_at: 'desc'
            },
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit),
        });
        const total = await prisma.users.count();
        return c.json(
            {
                message: "Successfully retrieved data",
                data: users,
                total
            },
            200
        );
    } catch (error) {
        return c.json({ message: error }, 500);
    }
});

// CREATE NEW USER
app.post('/', validator('json', (value, c) => {
    const parsed = userValidation.safeParse(value)
    if (!parsed.success) {
        return c.json({ message: "Data validation failed" }, 401)
    }
    return parsed.data
}), async (c) => {
    try {
        const { name, phone, address } = c.req.valid('json');
        const user = await prisma.users.create({
            data: { name, address, phone }
        })
        return c.json({
            message: "Successfully added data",
            data: user
        })
    } catch (error) {
        return c.json({ message: error }, 500);
    }
});

// GET DATA USER BY ID
app.get("/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const user = await prisma.users.findUniqueOrThrow({
            where: {
                id,
            },
        });
        return c.json(
            {
                message: "Berhasil mendapatkan data user",
                data: user,
            },
            200
        );
    } catch (error) {
        return c.json({ message: error }, 500);
    }
});

// UPDATE DATA USER BY ID
app.patch("/:id", validator('json', (value, c) => {
    const parsed = userValidation.safeParse(value)
    if (!parsed.success) {
        return c.json({ message: "Data validation failed" }, 401)
    }
    return parsed.data
}), async (c) => {
    try {
        const id = c.req.param("id");
        const { name, phone, address } = c.req.valid('json');
        const user = await prisma.users.update({
            data: { name, phone, address },
            where: {
                id
            }
        })
        return c.json({
            message: "Successfully changed data",
            data: user
        })
    } catch (error) {
        return c.json({ message: error }, 500);
    }
});

// DELETE DATA USER BY ID
app.delete("/:id", async (c) => {
    try {
        const id = c.req.param("id");
        const user = await prisma.users.delete({
            where: {
                id,
            },
        });
        return c.json(
            {
                message: "Successfully deleted data",
                data: user,
            },
            200
        );
    } catch (error) {
        return c.json({ message: error }, 500);
    }
})

// DELETE ALL DATA
app.delete("/", async (c) => {
    try {
        const users = await prisma.users.deleteMany();
        return c.json({ message: "Successfully deleted all data", data: users })
    } catch (error) {
        return c.json({ message: error }, 500)
    }
})

export default app;
