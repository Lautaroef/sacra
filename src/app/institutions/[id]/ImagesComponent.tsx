"use client";

import type { institution, image } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

type Institution = institution & { images: image[] };

function ImagesComponent({ institution }: { institution: Institution }) {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  return (
    <>
      <Image
        src={institution.images[activeImageIndex].path}
        alt={institution.name}
        width={600}
        height={400}
      />
      <div className="images">
        {institution.images.map((image, index) => (
          <button
            type="button"
            key={image.id.toString()}
            className={activeImageIndex === index ? "active" : ""}
            onClick={() => setActiveImageIndex(index)}
          >
            <Image src={image.path} alt={institution.name} fill />
          </button>
        ))}
      </div>
    </>
  );
}

export default ImagesComponent;
