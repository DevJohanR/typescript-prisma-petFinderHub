import { PrismaClient, Usuario as PrismaUsuario } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

class Usuario{
    id?: number
    nombre: string;
    email: string;
    password: string;
    esVoluntario: boolean;

    constructor(nombre:string, email:string, password: string, esVoluntario = false){
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.esVoluntario = esVoluntario
    }

    async save(): Promise<PrismaUsuario>{
        const hashedPassword = await bcrypt.hash(this.password,10);
        return prisma.usuario.create({
            data: {
                nombre: this.nombre,
                email: this.email,
                password: hashedPassword,
                esVoluntario: this.esVoluntario
            },
        });
    }

    static async findByEmail(email:string): Promise<PrismaUsuario | null >{
        return prisma.usuario.findUnique({
            where: {email},
        })
    }


    static async findById(id: number): Promise<PrismaUsuario | null>{
        return prisma.usuario.findUnique({
            where: {id},
        })
    }

}

export default Usuario;

