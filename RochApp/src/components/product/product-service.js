import { apiService } from '../../common/base/api-service';
class ProductService {
    list(query) {
        return apiService.get('api/Product/List', query).then(r => r.json());
    }
    insert(query) {
        return apiService.post('api/Product/Insert', query).then(r => r.json());
    }
    getToEdit(query) {
        return apiService.get('api/Product/Edit', query).then(r => r.json());
    }
    getNextId() {
        return apiService.get('api/Product/GetNextId').then(r => r.json());
    }
    edit(query) {
        return apiService.put('api/Product/Edit', query).then(r => r.json());
    }
    delete(query) {
        return apiService.delete('api/Product/Delete', query);
    }
}
export default new ProductService();
