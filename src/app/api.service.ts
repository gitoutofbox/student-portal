import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
// const httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };
 
@Injectable()
export class ApiService {
  constructor(private http:Http) {}

  get(url: string) {
      return this.http.get(url).map((res:Response) => res.json());
  }
  
  post(url: string, postData: Object) {
      return this.http.post(url, postData).map((res:Response) => res.json());
  }
  put(url: string, postData: Object) {
      return this.http.put(url, postData).map((res:Response) => res.json());
  }

  patch(url: string, postData: Object) {
      return this.http.patch(url, postData).map((res:Response) => res.json());
  }

  delete(url: string, postData: Object) {
      return this.http.delete(url, postData).map((res:Response) => res.json());
  }

}
