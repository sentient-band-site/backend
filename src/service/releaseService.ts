import prisma from "../prisma/client";

export const getAll = async () => {
    return prisma.release.findMany();
};

export const createRelease = async (newReleaseData: {
    name: string;
    imageName: string;
    video: string;
    desc: string;
}) => {
    return prisma.release.create({ data: newReleaseData });
};

export const updateRelease = async (id: number, updateReleaseData: {
    name: string;
    imageName: string;
    video: string;
    desc: string;
}) => {
    return prisma.release.update({ 
        where: {id},
        data: updateReleaseData, 
    });
};

export const deleteRelease = async (id: number) => {
    return prisma.release.delete({
        where: {id},
    });
};