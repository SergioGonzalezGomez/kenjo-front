import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'new-album-dialog',
  templateUrl: 'new-album.dialog.html',
  styleUrls: ['./new-album.dialog.scss']
})

export class NewAlbumDialog implements OnInit {
  album = {
    title: '',
    year: 1900,
    artist: '',
    photoUrl: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  createNewAlbum(album: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post<any>('http://localhost:3000/album/create', JSON.stringify(album), httpOptions).subscribe();
  }

}