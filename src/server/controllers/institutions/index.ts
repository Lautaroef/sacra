import type { Prisma } from "@prisma/client";
import { prisma } from "server/db/client";
import uploadImageToCloudinary from "lib/uploadImageToCloudinary";
import * as Yup from "yup";

export async function getInstitutions() {
  const institutions = await prisma.institution?.findMany({
    include: {
      images: true,
    },
  });

  return institutions;
}

export async function getInstitution(id: number) {
  const institution = await prisma.institution?.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
    },
  });

  if (!institution) {
    throw new Error("Institution not found");
  }
  return institution;
}

export async function updateInstitution(id: number, data: Prisma.institutionUpdateInput) {
  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
    images,
  } = data;

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    about: Yup.string().required().max(300),
    instructions: Yup.string().required(),
    opening_hours: Yup.string().required(),
    open_on_weekends: Yup.boolean().required(),
    images: Yup.array(
      Yup.object().shape({
        path: Yup.string().required(),
      })
    ),
  });

  await schema.validate(data, {
    abortEarly: false,
  });

  const imageUrls = await uploadImageToCloudinary(images as string[]);

  if (!imageUrls) {
    throw new Error("Error uploading images");
  }

  const institution = await prisma.institution?.update({
    where: {
      id,
    },
    data: {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images: {
        create: imageUrls.map((url) => {
          return { path: url };
        }),
      },
    },
  });
  return institution;
}
