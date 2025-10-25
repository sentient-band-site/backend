import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const findUniqueCheck = async (email: string, password?: string): Promise<User> => {
    console.log("findUniqueCheck: finding user with email:", email);

    const user = await prisma.user.findUnique({where: {email}})
    console.log("findUniqueCheck: Database query result:", user ? "User found" : "User NOT found");

    if (!user) {
        console.log("findUniqueCheck: ERROR: No user in database with email:", email);
        throw new Error("User not found");
    }
    
    if(password) {
        console.log("findUniqueCheck: validating passowrd...")
        await isValidCheck(user, password);
        console.log("findUniqueCheck: password validation passed")
    }
    return user;
};

const isValidCheck = async (user: User, password: string) => {
    console.log("isValidCheck: comparing password for user:", user.email);
    console.log("isValidCheck: stored hash exists:", !!user.password);
    console.log("Has starts with $2:", user.password?.startsWith('$2'));

    const valid = await bcrypt.compare(password, user.password);
    console.log("isValidCheck: Password comparison result:", valid);

    if(!valid) {
        console.log("isValidCheck: ERROR: Invalid password for user", user.email);
        throw new Error("Invalid password")
    } 
};

const tokenCreate = (user: User) => {
    return jwt.sign(
        {id: user.id, role: user.role, email: user.email},
        process.env.JWT_SECRET as string,
        {expiresIn: "1d"}
    );
};

export const registerUser = async (data: { email: string; password: string; }) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const adminExists = await prisma.user.findFirst({
        where: {role: "admin"},
    });

    const role = adminExists ? "customer" : "admin";

    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            role,
        },
    })

    return { id: user.id, email:user.email, role: user.role };
};

export const loginUser = async (email: string, password: string) => {
    console.log("LOGIN ATTEMPT");
    console.log("Email", email);
    console.log("Password received", password ? "YES" : "NO");
    
    try{
        const user = await findUniqueCheck(email, password);
        console.log("User found:", user.email);
        console.log("User ID:", user.id);

        const token = tokenCreate(user)
        console.log("Token created successfully");

        return { token, user };   
    } catch (err) {
        console.error("login failed", err)
        throw err;
    }
};

export const logoutUser = async () => {
    return {message: "Logout Successful"}
}

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

export const changeUserRole = async (email: string, role: string) => {
    await findUniqueCheck(email);

    const acceptedRoles = ["admin", "customer"];

    if (acceptedRoles.includes(role)) {
        return await prisma.user.update({
            where: {email},
            data: {role},
        })
    } else {
        throw new Error("Invalid Data");
    }
};