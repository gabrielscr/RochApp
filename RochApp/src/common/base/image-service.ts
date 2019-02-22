import { getEnvironment } from '../base/env-factory';

class ImageService  {
  private __env = getEnvironment();

  getImageUrl(imagePath: string): string {
    if (!imagePath)
      return null;

    return `${this.__env.storeUrl}${imagePath.replace('\\', '/')}`;
  }
}

export default new ImageService();
