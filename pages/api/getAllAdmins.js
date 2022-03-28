import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
    const admins = await prisma.admin.findMany();
    console.log(admins);
    res.status(200).json(admins);
}

export default handler;
