const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dgtvnojwb",
  api_key: "198469941315215",
  api_secret: "MtmnOP8Bu3URJb1fzJk3h4VMpZc",
});

export function uploadImage(imageUploaded) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imageUploaded[0].filepath, {}, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}
