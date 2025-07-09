import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseUrl = environment.host;

  constructor(private http: HttpClient) {}

  create<T>(endpoint: string, data: any): Observable<T> {
    return this.http
      .post<{ data: T }>(`${this.baseUrl}/${endpoint}`, data)
      .pipe(map((res) => res.data));
  }

  getDetail<T>(endpoint: string, id: string | number): Observable<T> {
    return this.http
      .get<{ data: T }>(`${this.baseUrl}/${endpoint}/${id}`)
      .pipe(map((res) => res.data));
  }

  getList<T>(endpoint: string, params?: Record<string, any>): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, params[key]);
      });
    }
    return this.http
      .get<{ data: T }>(`${this.baseUrl}/${endpoint}`, { params: httpParams })
      .pipe(map((res) => res.data));
  }

  update<T>(endpoint: string, id: string | number, data: any): Observable<T> {
    return this.http
      .put<{ data: T }>(`${this.baseUrl}/${endpoint}/${id}`, data)
      .pipe(map((res) => res.data));
  }

  delete<T>(endpoint: string, id: string | number): Observable<T> {
    return this.http
      .delete<{ data: T }>(`${this.baseUrl}/${endpoint}/${id}`)
      .pipe(map((res) => res.data));
  }
}
