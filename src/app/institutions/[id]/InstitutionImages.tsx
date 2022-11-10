"use client";

import type { institution, image } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

type Institution = institution & { images: image[] };

function InstitutionImages({ institution }: { institution: Institution }) {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  return (
    <>
      <Image src={institution.images[activeImageIndex].path} alt={institution.name} />
      <div className="images">
        {institution.images.map((image, index) => (
          <button
            key={image.id.toString()}
            className={activeImageIndex === index ? "active" : ""}
            type="button"
            onClick={() => {
              setActiveImageIndex(index);
            }}
          >
            <Image src={image.path} alt={institution.name} />
          </button>
        ))}
      </div>
    </>
  );
}

export default InstitutionImages;
