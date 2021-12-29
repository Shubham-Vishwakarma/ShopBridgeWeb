import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { User } from 'src/app/models/user';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authStatusListener = new Subject<boolean>()
  isAuthenticated = false;

  constructor(private http: HttpClient) {
  }

  private getLocalUser(): string {
    const u = localStorage.getItem('currentUser');
    if(u)
      return u;
    return '{}';
  }

  public getAuthStatus() {
    const u: string = this.getLocalUser();
    const token: string | null= localStorage.getItem('currentToken');
    const user: User | null = JSON.parse(u);
    if(user && user.token === token) {
      this.isAuthenticated = true;
    }
  }

  public getAuthStateListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  login(email: string, password: string) {
    return this.http
        .post<User>('http://localhost:5135/api/Auth/login',{email, password})
        .subscribe((result: User) => {
          this.saveAuthData(result);
          this.authStatusListener.next(true)
          this.isAuthenticated = true;
        },
        (error: any) => {
          this.authStatusListener.next(false)
          this.isAuthenticated = false;
        });
  }

  logout() {
    this.clearAuthData();
    this.authStatusListener.next(false);
    this.isAuthenticated = false;
  }

  saveAuthData(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('currentToken', user.token);
  }

  clearAuthData() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentToken');
  }

}
