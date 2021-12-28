import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUserSubject: BehaviorSubject<User | null>;
  currentUser: Observable<User | null>;
  isAuthenticated = false;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(this.getLocalUser()));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getLocalUser(): string {
    const u = localStorage.getItem('currentUser');
    if(u)
      return u;
    return '{}';
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    return this.http
        .post<User>
        ('http://localhost:5135/api/Auth/login',
        {email, password})
        .pipe(map((user: User) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.isAuthenticated = true;
          return user;
        }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticated = false;
  }
}
