import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-album-dialog',
  templateUrl: './update-album-dialog.component.html',
  styleUrls: ['./update-album-dialog.component.scss']
})
export class UpdateAlbumDialogComponent implements OnInit {
  album = {
    title: this.data.title,
    year: this.data.year,
    artist: this.data.artist,
    photoUrl: this.data.photoUrl
  };//Paso la info del album que se quiere actualizar con this.data
  constructor( @Inject(MAT_DIALOG_DATA) public data:any, private http: HttpClient) { } //Inyecto el mat_dialog_data para recuperar la data del album que queremos actualizar

  ngOnInit(): void {
    console.log(this.data);
    
  }
  updateAlbum(album: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.put<any>(`http://localhost:3000/album/${album._id}`, JSON.stringify(album), httpOptions).subscribe();
  }
}
