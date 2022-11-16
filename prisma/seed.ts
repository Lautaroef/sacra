import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const sacred = await prisma.institution.create({
    data: {
      name: "SACRED Centro de Dia",
      latitude: -24.84334336871451,
      longitude: -65.51297406279362,
      about:
        "Aspiramos a una sociedad inclusiva que brinde a todos sus miembros igualdad de oportunidades para su desarrollo personal, en una sociedad más justa e igualitaria.",
      instructions: "Nos podes visitar de Lunes a Viernes entre las 08:00 y las 18:00",
      opening_hours: "Horario de visitar de 8:00 a 13:00",
      open_on_weekends: false,
      images: {
        createMany: {
          data: [
            { path: "https://i.ibb.co/BKGc7dk/sanluis-1.png" },
            { path: "https://i.ibb.co/hXMXW8B/sanluis-2.png" },
          ],
          skipDuplicates: true,
        },
      },
    },
  });

  const florida = await prisma.institution.create({
    data: {
      name: "SACRA Centro Educativo Terapéutico Escuela de Educación Especial Nº 8180",
      latitude: -24.79547951673426,
      longitude: -65.41303766425689,
      about:
        "SACRA tiene el objetivo de promover el desarrollo integral e inclusión social participativa de personas con discapacidad, siempre trabajando junto a las familias. La Institución cuenta con los servicios de Atención Temprana, Escuela Especial, Centro Educativo Terapéutico, Inclusión Escolar y Formación Profesional. Sostiene su tarea a partir de un equipo interdisciplinario de profesionales, que con honestidad, perseverancia, competencia e idoneidad, pero sobre todo mucho amor, trabajan en pos de la igualdad de oportunidades y la dignidad de la persona con discapacidad.",
      instructions: "Nos podes visitar de Lunes a Viernes entre las 08:00 y las 18:00",
      opening_hours: "Horario de visitar de 8:00 a 13:00",
      open_on_weekends: false,
      images: {
        createMany: {
          data: [
            { path: "https://i.ibb.co/phGvYgK/florida-1.png" },
            { path: "https://i.ibb.co/09t4WXM/florida-2.png" },
          ],
          skipDuplicates: true,
        },
      },
    },
  });

  const quijano = await prisma.institution.create({
    data: {
      name: "SACRA C.E.T. Anexo Quijano",
      latitude: -24.89554465054367,
      longitude: -65.60487806899276,
      about:
        "Vocación de servicio; espíritu inclusivo, participativo, solidario, responsable y comprometido; trabajo en equipo profesionalidad y transparencia.",
      instructions: "Nos podes visitar de Lunes a Viernes entre las 08:00 y las 18:00",
      opening_hours: "Horario de visitar de 8:00 a 13:00",
      open_on_weekends: false,
      images: {
        createMany: {
          data: [
            { path: "https://i.ibb.co/C5nzWQt/quijano-1.png" },
            { path: "https://i.ibb.co/C5nzWQt/quijano-2.png" },
          ],
          skipDuplicates: true,
        },
      },
    },
  });

  const prado = await prisma.institution.create({
    data: {
      name: "El Prado Colleague",
      latitude: -24.83129877402802,
      longitude: -65.48872947692873,
      about:
        "El Prado Colleague cuenta con equipos interdisciplinarios en los diferentes servicios integrados por profesores de Educación Especial, Fonoaudiólogos, Psicólogos, Fisioterapeutas, Psicopedagogos, Terapista Ocupacionales, Médicos Neurólogos y Pediatras, Psicomotricistas, Trabajadores Sociales y Profesores de Áreas Especiales (Educación Física, Folklore, Música, Teatro, Ritmos Latinos, Carpintería, Cocina, Tapicería, entre otros) quienes, en conjunto con las familias de los usuarios proponen un Plan de Trabajo Centrado en la Persona a llevar adelante realizando actividades individuales / grupales.",
      instructions: "Nos podes visitar de Lunes a Viernes entre las 08:00 y las 18:00",
      opening_hours: "Horario de visitar de 8:00 a 13:00",
      open_on_weekends: false,
      images: {
        createMany: {
          data: [
            {
              path: "https://res.cloudinary.com/lautarofigueroa/image/upload/v1668531648/chivnjqqmefsl13tibnw.jpg",
            },
            {
              path: "https://res.cloudinary.com/lautarofigueroa/image/upload/v1668531648/k8fq1xtmwsqtmia59ps6.jpg",
            },
            {
              path: "https://res.cloudinary.com/lautarofigueroa/image/upload/v1668531647/cduip3f8m5x3phfd0yne.jpg",
            },
          ],
          skipDuplicates: true,
        },
      },
    },
  });

  console.log({ sacred, florida, quijano, prado });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
