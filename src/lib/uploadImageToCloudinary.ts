import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // secure: true,
});

const uploadImageToCloudinary = async (images: string[]) => {
  try {
    const imageUrls = await Promise.all(
      images.map((image) => {
        return cloudinary.uploader.upload(image, {
          upload_preset: "sacra_images",
        });
      })
    );
    return imageUrls.map((image) => image.secure_url);
  } catch (error) {
    console.log(error);
  }
};

export default uploadImageToCloudinary;
