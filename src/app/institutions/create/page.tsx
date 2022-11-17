"use client";
import type { CreateInstitutionWithImages, InstitutePosition } from "types";
import type { LeafletMouseEvent } from "leaflet";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Map from "../Map";

import { FiPlus, FiX } from "react-icons/fi";

function CreateInstitutionComponent() {
  const [position, setPosition] = useState<InstitutePosition>({ latitude: 0, longitude: 0 });
  const [name, setName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [opening_hours, setOpeningHours] = useState<string>("");
  const [open_on_weekends, setOpenOnWeekends] = useState<boolean>(true);
  const [previewSources, setPreviewSources] = useState<string[]>([]);
  const router = useRouter();

  const institution: CreateInstitutionWithImages = {
    name,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
    latitude: position.latitude,
    longitude: position.longitude,
    images: previewSources,
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(institution);
    // Check if all fields are filled
    // if not, alert the user
    // if yes, create the institution
    if (
      !name ||
      !about ||
      !instructions ||
      !opening_hours ||
      !position.latitude ||
      !position.longitude ||
      previewSources.length === 0
    ) {
      alert("Por favor, complete los 7 campos");
    } else {
      await fetch("/api/institutions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(institution),
      }).then((res) => {
        if (res.status === 200) {
          alert("Institución creada con éxito");
          router?.push("/institutions");
        } else {
          alert("Error al crear la institución");
        }
      });
    }
  }

  // create function that creates a marker on the position clicked
  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng });
  }

  // handle addition and removal of images
  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files) return;

    let file;

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader(); // this must be inside the loop,
      // otherwise it results in an error saying that the reader is busy reading another file
      file = files[i];
      reader.onloadend = () => {
        setPreviewSources((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  }

  const removeImage = (index: number) => {
    const newImages = previewSources.filter((image, i) => i !== index);
    setPreviewSources(newImages);
  };

  return (
    <main id="page-create-institution">
      <form className="create-institution-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Institución</legend>{" "}
          {typeof window !== "undefined" && (
            <Map
              zoom={12.5}
              center={[-24.8421731, -65.5109202]}
              style={{ width: "100%", height: 280 }}
              onClick={handleMapClick}
              markers={institution}
            />
          )}
          <small>Seleccione en el mapa el punto de la nueva institución.</small>
          <div className="input-block" style={{ marginTop: "1.5rem" }}>
            <label htmlFor="name">Nombre</label>
            <input id="name" onBlur={(e) => setName(e.target.value)} />
          </div>
          <div className="input-block">
            <label htmlFor="about">
              Descripción <span>Máximo de 600 caracteres</span>
            </label>
            <textarea id="name" maxLength={600} onBlur={(e) => setAbout(e.target.value)} />
          </div>
          <div className="input-block">
            <label htmlFor="images">Imágenes</label>

            <div className="images-container">
              {previewSources.map((image, i) => (
                <div key={i} className="thumbnail">
                  <Image alt={name} key={i} src={image} fill />
                  <button
                    type="button"
                    className="close-button-absolute"
                    onClick={() => removeImage(previewSources.indexOf(image))}
                  >
                    <FiX size={16} color="#FF669D" />
                  </button>
                </div>
              ))}
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
            <textarea id="instructions" onBlur={(e) => setInstructions(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="opening_hours">Horario de apertura</label>
            <input id="opening_hours" onBlur={(e) => setOpeningHours(e.target.value)} />
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

// Descripcion de La Nueva Institucion
// Instrucciones de La Nueva Institucion
