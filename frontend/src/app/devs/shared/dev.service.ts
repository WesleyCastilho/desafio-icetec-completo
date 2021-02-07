import {environment} from './../../../environments/environment';
import {Dev} from './dev';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DevService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Dev[]>(`${environment.api}/candidato`);
  }

  getById(id: string) {
    return this.http.get<Dev>(`${environment.api}/candidato/${id}`);
  }

  save(dev: Dev) {
    const devBody = {
      name: dev.name,
      email: dev.email,
      age: dev.age,
      linkedin: dev.linkedin,
      skills: dev.skills,
    };

    if (dev.id) {
      return this.http.put<Dev>(`${environment.api}/candidato/${dev.id}`, devBody);
    } else {
      return this.http.post<Dev>(`${environment.api}/candidato`, devBody);
    }
  }

  delete(id: number) {
    return this.http.delete(`${environment.api}/devs/${id}`);
  }
}
