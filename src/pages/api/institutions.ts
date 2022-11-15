import type { NextApiRequest, NextApiResponse } from "next";
import type { CreateInstitutionWithImages } from "types";

import { prisma } from "server/db/client";
import uploadImageToCloudinary from "lib/uploadImageToCloudinary";
import * as Yup from "yup";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as CreateInstitutionWithImages;

  if (req.method === "POST") {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    } = body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(600),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
    });
    await schema.validate(body, {
      abortEarly: false,
    });

    // Submit the images to IMGBB and return an array of urls
    const imageUrls = await uploadImageToCloudinary(images);

    if (!imageUrls) {
      return res.status(400).json({ error: "Error uploading images" });
    }

    // Submit the institution to the database
    const institution = await prisma.institution?.create({
      data: {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
        images: {
          createMany: {
            data: imageUrls.map((url) => ({ path: url })),
            skipDuplicates: true,
          },
        },
      },
    });

    res.status(200).json(institution);
  }
}
