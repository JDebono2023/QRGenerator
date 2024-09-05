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
    resetForm(); // Reset form fields
    clearURLParameters(); // Clear URL parameters
  }
};

// Generate QR code and display it in the modal
const generateQRCode = (url, size) => {
  // clearUI(); // Clear previous content
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
      img.style.maxWidth = "300px";

      qrCodeContainer.innerHTML = ""; // Clear canvas
      qrCodeContainer.appendChild(img); // Add the image to the left side

      createSaveBtn(img.src, size); // Create the download button

      updateURLParameters(url, size); // Update URL parameters
      
      document.getElementById("qrModal").style.display = "block"; // Open the modal
    } else {
      console.error("QR code canvas not found.");
    }
  }, 100);
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl, size) => {
 clearSaveBtn();
  

  const link = document.createElement("a");
  link.href = saveUrl;
  link.download = size +"_qrcode.png"; // Specify the filename
  link.innerHTML = "Download Your QR Code";
  link.className = "w3-button w3-round";
  link.style.backgroundColor = "#82B7DA"
  link.style.display = "inline-block";
  link.style.textAlign = "center";
  link.style.padding = "10px 20px";
  link.style.color = "#3C3D3E";
  link.style.textDecoration = "none";

// Add an event listener to handle the closing of the modal and resetting URL parameters
link.addEventListener("click", () => {
  setTimeout(() => {
    closeModal(); // Close the modal after a slight delay to ensure download starts
    clearURLParameters(); // Reset URL parameters
    resetForm(); // Reset the form fields
  }, 100); // Adjust delay if necessary
});

  document.getElementById("qr-info").appendChild(link);
};



// Function to close the modal
const closeModal = () => {
  document.getElementById("qrModal").style.display = "none"; // Hide the modal
  clearSaveBtn();
  clearURLParameters(); // Reset URL parameters
    // resetForm();
};

const clearURLParameters = () => {
  const url = new URL(window.location.href);
  url.search = ''; // Clear query parameters
  window.history.replaceState({}, document.title, url.href); // Update the URL without reloading
};

const updateURLParameters = (url, size) => {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('url', url); // Update URL parameter
  currentUrl.searchParams.set('size', size); // Update Size parameter
  window.history.replaceState({}, document.title, currentUrl.href); // Update the URL without reloading
};

// Function to reset the form fields
const resetForm = () => {
  const form = document.getElementById("generate-form");
  if (form) {
    form.reset(); // Reset form fields
  }
};

const clearSaveBtn = () => {
  const qrInfoContainer = document.getElementById("qr-info");

  // Remove any existing save button to prevent duplicates
  const existingLink = qrInfoContainer.querySelector("a");
  if (existingLink) {
    existingLink.remove();
  }
}


document.addEventListener("submit", onGenerateSubmit);

