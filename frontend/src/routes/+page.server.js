import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    const page = url.searchParams.get('page') || 1;
    const id = String(url.searchParams.get('id'));

    /**
     * @param {string | number} page
     */
    async function getUsers(page) {
        try {
            const res = await fetch(`http://localhost:3000/users?page=${page}`);
            const data = await res.json();
            return data;
        } catch (error) {
            return fail(500, { message: "Error" })
        }
    }

    /**
     * @param {string} id
     */
    async function getUserByID(id) {
        try {
            const res = await fetch(`http://localhost:3000/users/${id}`);
            const data = await res.json();
            return data;
        } catch (error) {
            return fail(500, { message: "Server Error" })
        }
    }

    return { users: await getUsers(page), user: await getUserByID(id) }
}

/** @type {import('./$types').Actions} */
export const actions = {
    create: async ({ request }) => {
        try {
            const formData = Object.fromEntries(await request.formData());
            const res = await fetch('http://localhost:3000/users', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            return { success: true, message: data.message }
        } catch (error) {
            return fail(500, { message: "Server Error" })
        }
    },

    update: async ({ request, url }) => {
        try {
            const formData = Object.fromEntries(await request.formData());
            const id = url.searchParams.get('id');
            const res = await fetch(`http://localhost:3000/users/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            return { success: true, message: data.message }
        } catch (error) {
            return fail(500, { message: "Server Error" })
        }
    },

    delete: async ({ url }) => {
        try {
            const id = url.searchParams.get('id');
            const res = await fetch(`http://localhost:3000/users/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            return { success: true, message: data.message }
        } catch (error) {
            return fail(500, { message: "Server Error" })
        }
    },

    delete_all: async () => {
        try {
            const res = await fetch('http://localhost:3000/users', {
                method: "DELETE",
            });
            const data = await res.json();
            return { success: true, message: data.message }
        } catch (error) {
            return fail(500, { message: "Server Error" })
        }
    }
};