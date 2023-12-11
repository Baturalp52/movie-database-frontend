export default function base64toFile(base64String: string) {
  // Split the Base64 string to get the data part
  const mimeType = base64String.split(',')[0].split(':')[1].split(';')[0];
  const base64Data = base64String.split(',')[1];

  // Convert the Base64 data to a binary array
  const binaryData = atob(base64Data);

  // Create a Uint8Array from the binary data
  const uint8Array = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  // Create a Blob from the Uint8Array
  const blob = new Blob([uint8Array]);

  // Generate a random file name
  const fileName = generateRandomFileName();

  // Create a File object from the Blob
  const file = new File([blob], fileName, { type: mimeType });

  return file;
}

function generateRandomFileName() {
  const randomString = Math.random().toString(36).substring(2, 8);
  const timestamp = Date.now();
  return `file_${timestamp}_${randomString}`;
}
