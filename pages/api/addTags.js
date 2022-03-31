import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
    console.log(req.body);
    const newSong = await prisma.tags.create({
        data: {
            tag_name: req.body.tag,
        },
    });
    console.log(newSong);
    res.status(200).json(newSong);
}

export default handler;
