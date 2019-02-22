import { getEnvironment } from '../base/env-factory';
class ImageService {
    constructor() {
        this.__env = getEnvironment();
    }
    getImageUrl(imagePath) {
        if (!imagePath)
            return null;
        return `${this.__env.storeUrl}${imagePath.replace('\\', '/')}`;
    }
}
export default new ImageService();
