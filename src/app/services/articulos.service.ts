import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rubro } from '../models/Rubro';
import { Articulo } from '../models/Articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  private BASE_URL = 'http://168.194.207.98:8081';

  constructor(private http: HttpClient) {}

  getRubros(): Observable<Rubro[]> {
    return this.http.get<Rubro[]>(`${this.BASE_URL}/api_articulo/get_rubros.php`);
  }

  getArticulosPorRubro(idrubro: number): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.BASE_URL}/api_articulo/get_articulos_por_rubro.php?idrubro=${idrubro}`);
  }

  getArticulo(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.BASE_URL}/api_articulo/get_articulo.php?id=${id}`);
  }

  getArticulosPorCodigo(codigo: string): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.BASE_URL}/api_articulo/get_articulos_por_codigo.php?codigo=${codigo}`);
}


  postArticulo(articulo: Articulo): Observable<any> {
    return this.http.post(`${this.BASE_URL}/api_articulo/post_articulo.php`, articulo);
  }

  putArticulo(articulo: Articulo): Observable<any> {
    return this.http.put(`${this.BASE_URL}/api_articulo/put_articulo.php`, articulo);
  }

  deleteArticulo(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api_articulo/delete_articulo.php?id=${id}`);
  }
}
