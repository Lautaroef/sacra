import axios from "axios";

const uploadImagesToIMGBB = async (images: FileList) => {
  const urls: string[] = [];

  for (let i = 0; i < images.length; i++) {
    const formData = new FormData();
    formData.append("image", images[i] as any);
    const response = await axios.post(process.env.NEXT_PUBLIC_IMGBB_API_URL!, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    urls.push(response.data.data.url);
  }

  return urls;
};

export default uploadImagesToIMGBB;

/*
Example response:

{
  "data": {
    "id": "2ndCYJK",
    "title": "c1f64245afb2",
    "url_viewer": "https://ibb.co/2ndCYJK",
    "url": "https://i.ibb.co/w04Prt6/c1f64245afb2.gif",
    "display_url": "https://i.ibb.co/98W13PY/c1f64245afb2.gif",
    "width":"1",
    "height":"1",
    "size": "42",
    "time": "1552042565",
    "expiration":"0",
    "image": {
      "filename": "c1f64245afb2.gif",
      "name": "c1f64245afb2",
      "mime": "image/gif",
      "extension": "gif",
      "url": "https://i.ibb.co/w04Prt6/c1f64245afb2.gif",
    },
    "thumb": {
      "filename": "c1f64245afb2.gif",
      "name": "c1f64245afb2",
      "mime": "image/gif",
      "extension": "gif",
      "url": "https://i.ibb.co/2ndCYJK/c1f64245afb2.gif",
    },
    "medium": {
      "filename": "c1f64245afb2.gif",
      "name": "c1f64245afb2",
      "mime": "image/gif",
      "extension": "gif",
      "url": "https://i.ibb.co/98W13PY/c1f64245afb2.gif",
    },
    "delete_url": "https://ibb.co/2ndCYJK/670a7e48ddcb85ac340c717a41047e5c"
  },
  "success": true,
  "status": 200
}

*/

// import multer from 'multer';
// import path from 'path';

// const imageUploaderConfig = {
//   storage: multer.diskStorage({
//     destination: path.join(__dirname, '..', '..', 'uploads'),
//     filename: (request, file, cb) => {
//       const fileName = `${Date.now()}-${file.originalname}`;
//       cb(null, fileName);
//     }
//   })
// }

// export default imageUploaderConfig;
