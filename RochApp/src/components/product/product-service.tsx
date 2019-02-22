import { apiService } from '../../common/base/api-service';
import Api from '../../api.typings';

class ProductService {
  list(query?: Api.Product.List.Query): Promise<Api.Product.List.Dto> {
    return apiService.get('api/Product/List', query).then(r => r.json());
  }

  insert(query: Api.Product.InsertEdit.Command): Promise<number> {
    return apiService.post('api/Product/Insert', query).then(r => r.json());
  }

  getToEdit(query: Api.Product.InsertEdit.Query): Promise<Api.Product.InsertEdit.Command> {
    return apiService.get('api/Product/Edit', query).then(r => r.json());
  }

  getNextId(): Promise<number> {
    return apiService.get('api/Product/GetNextId').then(r => r.json());
  }

  edit(query: Api.Product.InsertEdit.Command): Promise<number> {
    return apiService.put('api/Product/Edit', query).then(r => r.json());
  }

  delete(query: Api.Product.Delete.Command) {
    return apiService.delete('api/Product/Delete', query);
  }
}

export default new ProductService();
