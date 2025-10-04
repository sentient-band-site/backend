import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// TODO: findUniqueCheck function
const findUniqueCheck = async (email: string, password?: string): Promise<User> => {
    const user = await prisma.user.findUnique({where: {email}})
    if (!user) throw new Error("User not found");
    
    if(password) {
        isValidCheck(user, password);
    }
    return user;
};
// TODO: isValidCheck function
const isValidCheck = async (user: User, password: string) => {
    const valid = await bcrypt.compare(password, user.password);
    if(!valid) throw new Error("Invalid email or password")
};
// TODO: token function
const tokenCreate = (user: User) => {
    return jwt.sign(
        {id: user.id, role: user.role},
        process.env.JWT_SECRET as string,
        {expiresIn: "1d"}
    );
};

export const registerUser = async (data: { email: string; password: string; }) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            role: "customer",
        },
    })

    return { id: user.id, email:user.email, role: user.role };
};

export const loginUser = async (email: string, password: string) => {
    const user = await findUniqueCheck(email, password);
    const token = tokenCreate(user)

    return { token, user };
};

// DEV ONLY

export const deleteUser = async (email: string) => {
    await findUniqueCheck(email) 
    return await prisma.user.delete({where: { email }});
};

export const getToken = async (email: string, password: string) => {
    const user = await findUniqueCheck(email, password);
    const token = tokenCreate(user);

    return token;
};