import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
    const contacts = await prisma.song.findMany();
    console.log(contacts);
    res.status(200).json(contacts);
}

export default handler;
