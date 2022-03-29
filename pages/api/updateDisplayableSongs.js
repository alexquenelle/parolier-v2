import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
    console.log(req.body);
    const updatedDisplaySongs = await prisma.song.update({
        where: {
            id: req.body.id,
        },
        data: {
            display: req.body.boolIsDisplayable,
        },
    });
    console.log(updatedDisplaySongs);
    res.status(200).json(updatedDisplaySongs);
}

export default handler;
