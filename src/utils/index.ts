export function convertBase64(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader: FileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (): void => resolve(fileReader.result);
    fileReader.onerror = (error: ProgressEvent<FileReader>): void =>
      reject(error);
  });
}
