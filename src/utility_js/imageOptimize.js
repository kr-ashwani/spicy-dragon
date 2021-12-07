const MAX_WIDTH = 1024;
const MAX_HEIGHT = 800;
const MIME_TYPE = "image/jpeg";
const QUALITY = 0.9;


export function optimizeFile(inputFile, setCompressedFile) {
  const file = inputFile; // get the file
  if (!inputFile)
    return
  const blobURL = URL.createObjectURL(file);
  const img = new Image();
  img.src = blobURL;
  img.onerror = function () {
    URL.revokeObjectURL(this.src);
    // Handle the failure properly
    console.log("Cannot load image");
  };
  img.onload = function () {
    URL.revokeObjectURL(this.src);
    const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
    const canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, newWidth, newHeight);
    canvas.toBlob(
      (blob) => {
        // Handle the compressed image. es. upload or save in local state
        const myFile = new File([blob], "image.jpeg", {
          type: blob.type
        })

        setCompressedFile(myFile) //file is compressed and state of component(that called this function) is updated to compressed blob
      },
      MIME_TYPE,
      QUALITY
    );
  };
};

function calculateSize(img, maxWidth, maxHeight) {
  let width = img.width;
  let height = img.height;

  // calculate the width and height, constraining the proportions
  // calculating dimensions of compressed image by retaining aspect ratio.
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  }
  return [width, height];
}
