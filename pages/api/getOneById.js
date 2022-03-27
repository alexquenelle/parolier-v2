import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
    console.log(req.query.id);
    const song = await prisma.song.findUnique({
        where: {
            id: req.query.id,
        },
    });
    console.log(song);
    res.status(200).json(song);
}

export default handler;
