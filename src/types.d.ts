import { image, institution } from "@prisma/client";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type CompleteInstitution = institution & { images: image[] };
type InstitutionOptionalId = Optional<institution, "id">;

type CreateInstitutionWithImages = Omit<institution, "id"> & {
  images: string[];
};

type InstitutePosition = {
  latitude: number;
  longitude: number;
};
