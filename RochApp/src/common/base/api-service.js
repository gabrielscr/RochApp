import { HttpClientService } from './http-client';
import { getEnvironment } from './env-factory';
let env = getEnvironment();
let apiService = new HttpClientService();
apiService
    .configure(c => c
    .useStandardConfiguration()
    .withBaseUrl(env.apiUrl)
    .rejectErrorResponses());
export { apiService };
