import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
    const updatedSongs = await prisma.song.update({
        where: {
            id: req.body.id,
        },
        data: {
            song_title: req.body.song_title,
            song_buffer: req.body.song_buffer,
        },
    });
    res.status(200).json(updatedSongs);
}

export default handler;
