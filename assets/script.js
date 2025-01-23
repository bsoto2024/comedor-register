const video = document.getElementById('video');
const output = document.getElementById('output');

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        video.srcObject = stream;
    } catch (error) {
        output.textContent = "Error al acceder a la cámara: " + error.message;
    }
}

function scanCode() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height);

    if (code) {
        output.textContent = `Código detectado: ${code.data}`;
    } else {
        requestAnimationFrame(scanCode);
    }
}

video.addEventListener('play', () => {
    scanCode();
});

startCamera();