import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, from, Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { Filter } from '../model/filter.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userEditSubject = new Subject<User>();
  addUserSubject = new Subject<User>();
  filterUserSubject = new Subject<Filter>();
  deleteUsersSubject = new Subject<User[]>();
  closeModalSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  filterUser(params: Filter): Observable<User[]> {
    return this.http.get<User[]>(`https://jsonplaceholder.typicode.com/users`).pipe(
      map(users => users.filter(user => user.name.toLocaleLowerCase().includes(params.name.toLocaleLowerCase().trim()))),
      map(data => data.filter(user => user.username.toLocaleLowerCase().includes(params.username.toLocaleLowerCase().trim())))
    );
  }

  removeUser(id: number): Observable<any> {
    return this.http.delete<any>(`https://jsonplaceholder.typicode.com/users/${id}`);
  }

  createUser(user): Observable<User> {
    return this.http.post<User>(`https://jsonplaceholder.typicode.com/users`, user);
  }

  editUser(user: User): Observable<User> {
    return this.http.patch<User>(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
  }
}
