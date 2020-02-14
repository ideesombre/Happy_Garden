import { Inject, Injectable, InjectionToken } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { AuthenticateApiService } from 'src/app/services/authenticateApi/authenticate-api.service';
import { UserAccount } from 'src/app/classes/user-account';

export const AuthApiToken = new InjectionToken('AuthApiToken');

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  isAuth$ = new BehaviorSubject<boolean>(null);
  userAuth$ = new BehaviorSubject<UserAccount>(null);

  constructor(
    @Inject(AuthApiToken) private api: AuthenticateApiService,
    private storage: StorageMap
  ) {}

  get isAuthentificated$() {
    return this.isAuth$.pipe(
      switchMap(isAuth => {
        if (isAuth === null) {
          return this.load().pipe(
            tap(value => {
              if (value) {
                this.isAuth$.next(true);
                this.userAuth$.next(value);
              } else {
                this.isAuth$.next(false);
              }
            }),
            map(() => null)
          );
        }
        return of(isAuth);
      }),
      filter(isAuth => isAuth !== null)
    );
  }

  get user$(): Observable<UserAccount> {
    return this.userAuth$.pipe(filter(user => user !== null));
  }

  login(username: string, password: string): Observable<UserAccount> {
    return this.api.login(username, password).pipe(
      switchMap(value => this.save(value)),
      tap(value => {
        this.isAuth$.next(true);
        this.userAuth$.next(value);
      })
    );
  }

  logout(): Observable<void> {
    return this.api.logout().pipe(
      catchError(() => {
        return of(true);
      }),
      switchMap(() => {
        return this.storage.clear();
      }),
      map(() => {}),
      tap(() => {
        this.isAuth$.next(false);
        this.userAuth$.next(null);
      })
    );
  }

  save(data): Observable<any> {
    return this.storage.set('STORE', data).pipe(map(() => data));
  }

  load(): Observable<any> {
    return this.storage.get('STORE');
  }
}
