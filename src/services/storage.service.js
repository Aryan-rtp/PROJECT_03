const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
  try {
    const response = await imagekit.files.upload({
      file: file,
      fileName: fileName,
      folder: "AI_CAPTION_POST",
    });

    return response;
  } catch (error) {
    console.log("Image Upload Error:", error);
    throw error;
  }
}

module.exports = uploadFile;
