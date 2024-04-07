import { type CkeditorImageUploder } from './types';

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.FileReader) {
      return reject(new Error('浏览器不支持FileReader'));
    }
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result as string);
    };
    reader.onerror = function (e) {
      reject(e);
    };
    reader.readAsDataURL(file);
  });
}

export class ImageUploadAdapter {
  constructor(
    public loader: any,
    public uploader: CkeditorImageUploder = fileToBase64
  ) {}
  async upload() {
    const loader = this.loader;

    const file = await (loader.file as Promise<File>);
    if (file) {
      const data = await this.uploader(file).catch((e) => {
        console.warn('XCkeditor', e);
        return null;
      });
      if (data) {
        loader.uploadTotal = file.size;
        loader.uploaded = file.size;
        return {
          default: data
        };
      }
    }
  }

  abort() {}
}
