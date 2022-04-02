import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
    const song = await prisma.song.findUnique({
        where: {
            id: req.query.id,
        },
    });
    res.status(200).json(song);
}

export default handler;
