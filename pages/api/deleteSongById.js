import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
    const deletedSong = await prisma.song.delete({
        where: {
            id: req.query.id,
        },
    });
    res.status(200).json(deletedSong);
}

export default handler;
