"use client";
import type { LeafletMouseEvent } from "leaflet";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import { createInstitution } from "server/controllers/institutions";

import { FiPlus } from "react-icons/fi";

const Map = dynamic(() => import("app/institutions/Map"), {
  loading: () => <p>Cargando mapa...</p>,
  ssr: false,
});

function CreateInstitutionComponent() {
  const router = useRouter();

  const [position, setPosition] = useState<InstitutePosition>({ latitude: 0, longitude: 0 });
  const [name, setName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [opening_hours, setOpeningHours] = useState<string>("");
  const [open_on_weekends, setOpenOnWeekends] = useState<boolean>(true);
  const [images, setImages] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // create function that creates a marker on the position clicked
  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    console.log(event.target.files);

    const selectedImages: File[] = Array.from(event.target.files);
    const urlsStrings: string[] = selectedImages.map((image) => URL.createObjectURL(image));
    setImages(urlsStrings);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });
    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { latitude, longitude } = position;

    // const data = new FormData();

    // data.append("name", name);
    // data.append("about", about);
    // data.append("latitude", String(latitude));
    // data.append("longitude", String(longitude));
    // data.append("instructions", instructions);
    // data.append("opening_hours", opening_hours);
    // data.append("open_on_weekends", String(open_on_weekends));
    // images.forEach((image) => {
    //   data.append("images", image);
    // });

    // createInstitution({
    //   name,
    //   about,
    //   latitude: position.latitude,
    //   longitude: position.longitude,
    //   instructions,
    //   opening_hours,
    //   open_on_weekends,
    //   images: images.map((image) => ({
    //     path: image,
    //   })) as any,
    // });

    alert("Institución creada con éxito!");

    router?.push("/institutions");
  }
  return (
    <main id="page-create-institution">
      <form className="create-institution-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Institución</legend>
          <Map
            zoom={12.5}
            center={[-24.8421731, -65.5109202]}
            style={{ width: "100%", height: 280 }}
            onClick={handleMapClick}
            markers={{
              name,
              latitude: position.latitude,
              longitude: position.longitude,
              about,
              instructions,
              opening_hours,
              open_on_weekends,
            }}
          />
          <small>
            Hace click en el mapa para seleccionar el punto de la nueva institución.
          </small>

          <div className="input-block" style={{ marginTop: "1.5rem" }}>
            <label htmlFor="name">Nombre</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="about">
              Descripción <span>Máximo de 300 caracteres</span>
            </label>
            <textarea
              id="name"
              maxLength={300}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="images">Imágenes</label>

            <div className="images-container">
              {previewImages.map((image) => {
                return <Image alt={name} key={image} src={image} height={96} width={120} />;
              })}
              <label htmlFor="image[]" className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </label>
            </div>

            <input type="file" multiple onChange={handleSelectImages} id="image[]" />
          </div>
        </fieldset>

        <fieldset>
          <legend>Acerca del Negocio</legend>

          <div className="input-block">
            <label htmlFor="instructions">Instrucciones</label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="opening_hours">Horario de apertura</label>
            <input
              id="opening_hours"
              value={opening_hours}
              onChange={(e) => setOpeningHours(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="open_on_weekends">Atienden durante el fin de semana?</label>

            <div className="button-select">
              <button
                type="button"
                className={open_on_weekends ? "active" : ""}
                onClick={() => setOpenOnWeekends(true)}
              >
                Si
              </button>
              <button
                type="button"
                className={!open_on_weekends ? "active" : ""}
                onClick={() => setOpenOnWeekends(false)}
              >
                No
              </button>
            </div>
          </div>
        </fieldset>

        <button className="confirm-button" type="submit">
          Confirmar
        </button>
      </form>
    </main>
  );
}

export default CreateInstitutionComponent;
