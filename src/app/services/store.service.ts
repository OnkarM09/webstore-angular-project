import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../pages/models/product.model';

const baseUrl = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient : HttpClient) { }

  getAllProducts(limit =12, sort='desc', category? : string) : Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${baseUrl}/products${category ? '/category/' + category : ''}?sort=${sort}&limit=${limit}`
    );
  }

  getAllCategories(): Observable<Array<string>>{
    return this.httpClient.get<Array<string>>(
      `${baseUrl}/products/categories`
    )
  }
}
