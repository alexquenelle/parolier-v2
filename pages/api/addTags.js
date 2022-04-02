import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
    const newSong = await prisma.tags.create({
        data: {
            tag_name: req.body.tag,
        },
    });
    res.status(200).json(newSong);
}

export default handler;
