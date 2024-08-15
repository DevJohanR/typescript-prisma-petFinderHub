import { PrismaClient, Usuario as PrismaUsuario } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

class Usuario {
    id?: number;
    nombre: string;
    email: string;
    password: string;
    esVoluntario: boolean;

    constructor(nombre: string, email: string, password: string, esVoluntario = false) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.esVoluntario = esVoluntario;
    }

    // Método para guardar un usuario en la base de datos
    async save(): Promise<PrismaUsuario> {
        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(this.password, 10);
        console.log(`Contraseña Hashed: ${hashedPassword}`); // Log para ver la contraseña hashed
        return prisma.usuario.create({
            data: {
                nombre: this.nombre,
                email: this.email,
                password: hashedPassword,
                esVoluntario: this.esVoluntario,
            },
        });
    }

    // Método estático para buscar un usuario por correo electrónico
    static async findByEmail(email: string): Promise<PrismaUsuario | null> {
        return prisma.usuario.findUnique({
            where: { email },
        });
    }

    // Método estático para buscar un usuario por ID
    static async findById(id: number): Promise<PrismaUsuario | null> {
        return prisma.usuario.findUnique({
            where: { id },
        });
    }
}

export default Usuario;
