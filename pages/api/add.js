import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
    const newSong = await prisma.song.create({
        data: {
            song_title: 'JUL',
            song_buffer: 'Ce soir joublie tout',
        },
    });
    console.log(newSong);
    res.status(200).json(newSong);
}

export default handler;
