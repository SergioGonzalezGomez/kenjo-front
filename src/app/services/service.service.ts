import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private _refresh$ = new Subject<void>();
  constructor(private http: HttpClient) { }

  get refresh$() {
    return this._refresh$;
  }

  createNewAlbum(album: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>('http://localhost:3000/album/create', JSON.stringify(album), httpOptions)
      .pipe(
        tap(() => {this._refresh$.next();
        })
        )
  }

  getAlbum() {
   return this.http.get<any[]>('http://localhost:3000/album')
  }
  updateAlbum(album:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(`http://localhost:3000/album/${album.id}`, JSON.stringify(album), httpOptions).pipe(tap(() => {this._refresh$.next();
      })
      )
  }
}

