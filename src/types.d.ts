interface Institution {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

type InstitutePosition = {
  latitude: number;
  longitude: number;
};

type Orphanage = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: OrphanageImage[];
};

type OrphanageImage = {
  id: number;
  path: string;
};
