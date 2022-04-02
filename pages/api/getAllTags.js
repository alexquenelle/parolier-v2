import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
    const tags = await prisma.tags.findMany();
    res.status(200).json(tags);
}

export default handler;
