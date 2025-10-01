import { PrismaClient } from "../src/generated/prisma";
import data from "./data.json";

const prisma = new PrismaClient();

const main = async () => {
    for (const release of data.releases) {
        await prisma.release.create({
            data: {
                name: release.name,
                imageName: release.imageName,
                video: release.video,
                desc: release.desc
            }
        });
    }
}

main().then(() => {
    console.log("seeded");
}).catch((e) => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})