import { useState, FormEvent, ChangeEvent, useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import api from "../../services/api";
import dynamic from "next/dynamic";
import type { LeafletMouseEvent } from "leaflet";

import Sidebar from "../../components/Sidebar";
import mapIcon from "../../utils/mapIcon";
import { FiPlus } from "react-icons/fi";

function CreateOrphanage() {
  const router = useRouter();

  const [position, setPosition] = useState<InstitutePosition>({ latitude: 0, longitude: 0 });
  const [name, setName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [opening_hours, setOpeningHours] = useState<string>("");
  const [open_on_weekends, setOpenOnWeekends] = useState<boolean>(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const Map = useMemo(
    () =>
      dynamic(() => import("../../components/Map"), {
        loading: () => <p>Cargando mapa...</p>,
        ssr: false,
      }),
    []
  );

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { latitude, longitude } = position;

    const data = new FormData();

    data.append("name", name);
    data.append("about", about);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("instructions", instructions);
    data.append("opening_hours", opening_hours);
    data.append("open_on_weekends", String(open_on_weekends));
    images.forEach((image) => {
      data.append("images", image);
    });

    console.log(data);
    // await api.post("orphanages", data);

    alert("Successfully registered");

    router.push("/orphanages");
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    console.log(event.target.files);

    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Institución</legend>
            <Map
              markers={{
                id: 0,
                name: name,
                latitude: position.latitude,
                longitude: position.longitude,
                about: about,
                instructions: instructions,
                opening_hours: opening_hours,
                open_on_weekends: open_on_weekends,
              }}
              center={[-19.9292425, -43.9458236]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              // @ts-ignore
              onClick={handleMapClick}
            />

            <div className="input-block">
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
    </div>
  );
}

export default CreateOrphanage;
