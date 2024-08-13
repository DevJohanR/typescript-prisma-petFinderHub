import { PrismaClient, Campana as PrismaCampaña } from "@prisma/client";

const prisma = new PrismaClient();

class Campana {
    id?: number;
    titulo: string;
    descripcion?: string;
    activa: boolean;
    mascotaId: number;

    constructor(titulo: string, mascotaId: number, descripcion: string = '', activa = true) {
        this.titulo = titulo;
        this.descripcion = descripcion;  // Siempre será un string
        this.activa = activa;
        this.mascotaId = mascotaId;
    }

    async save(): Promise<PrismaCampaña> {
        return prisma.campana.create({
            data: {
                titulo: this.titulo,
                descripcion: this.descripcion || '',  // Proporciona un valor predeterminado si es undefined
                activa: this.activa,
                mascotaId: this.mascotaId,
            },
        });
    }
    


static async all(): Promise<PrismaCampaña[]> {
    return prisma.campana.findMany();
  }


  static async findById(id: number): Promise<PrismaCampaña | null> {
    return prisma.campana.findUnique({
      where: { id },
    });
  }
    

}

export default Campana;