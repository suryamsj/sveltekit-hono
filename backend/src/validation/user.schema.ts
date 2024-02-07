import { z } from 'zod';

const userValidation = z.object({
    name: z.string(),
    phone: z.string(),
    address: z.string()
});

export default userValidation;