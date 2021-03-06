import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
    const newSong = await prisma.song.create({
        data: {
            song_title: req.body.song_title,
            song_buffer: req.body.song_buffer,
            tags: req.body.tags,
        },
    });
    res.status(200).json(newSong);
}

export default handler;
