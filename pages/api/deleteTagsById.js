import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
    const deleteTag = await prisma.tags.delete({
        where: {
            id: req.query.id,
        },
    });
    res.status(200).json(deleteTag);
}

export default handler;
