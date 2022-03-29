import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
    const songsDisplayable = await prisma.song.findMany({
        where: {
            display: true,
        },
    });
    console.log(songsDisplayable);
    res.status(200).json(songsDisplayable);
}

export default handler;
