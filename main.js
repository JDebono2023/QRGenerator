// https://www.youtube.com/watch?v=qNiUlml9MDk

const form = document.getElementById("generate-form");
// const qr = document.getElementById("qrcode");

// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();
  console.log("Generator triggered");

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  console.log("URL:", url);
  console.log("Size:", size);

  // Validate URL
  if (url === "") {
    alert("Please enter a URL");
  } else {
    generateQRCode(url, size);
  }
};

// Generate QR code and display it in the modal
const generateQRCode = (url, size) => {
  console.log("Generating QR");

  // Update URL and size in the modal
  document.getElementById("display-url").textContent = url;
  document.getElementById("display-size").textContent = `${size}x${size}`;

  const qrCodeContainer = document.getElementById("qr-code-container");
  qrCodeContainer.innerHTML = ""; // Clear previous QR code

  // Create a new QR code in the container
  new QRCode(qrCodeContainer, {
    text: url,
    width: size,
    height: size,
    colorDark: "#123368",
    colorLight: "#ffffff",
  });

  // Convert the QR code canvas to an image after a short delay
  setTimeout(() => {
    const canvas = qrCodeContainer.querySelector("canvas");
    if (canvas) {
      const img = document.createElement("img");
      img.src = canvas.toDataURL("image/png");
      img.style.width = "50%";

      qrCodeContainer.innerHTML = ""; // Clear canvas
      qrCodeContainer.appendChild(img); // Add the image to the left side

      createSaveBtn(img.src); // Create the download button
      document.getElementById("qrModal").style.display = "block"; // Open the modal
    } else {
      console.error("QR code canvas not found.");
    }
  }, 100);
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.href = saveUrl;
  link.download = "qrcode.png"; // Specify the filename
  link.innerHTML = "Download Your QR Code";
  document.getElementById("qr-info").appendChild(link);
};

document.addEventListener("submit", onGenerateSubmit);

