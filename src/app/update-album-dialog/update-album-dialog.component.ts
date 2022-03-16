import { ServiceService } from './../services/service.service';
import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-update-album-dialog',
  templateUrl: './update-album-dialog.component.html',
  styleUrls: ['./update-album-dialog.component.scss']
})
export class UpdateAlbumDialogComponent implements OnInit {
  //Paso la info del album que se quiere actualizar con this.data
  suscription?: Subscription;
  album = {
    title: this.data.title,
    year: this.data.year,
    artist: this.data.artist,
    photoUrl: this.data.photoUrl,
    id: this.data._id
  };
  albumForm!: FormGroup;
  constructor( @Inject(MAT_DIALOG_DATA) public data:any, private fb: FormBuilder, private http: HttpClient, private serviceService: ServiceService) { } //Inyecto el mat_dialog_data para recuperar la data del album que queremos actualizar

  ngOnInit(): void {
    console.log(this.data);
    this.albumForm = this.fb.group({
     
      title: [this.data.title, Validators.required],
      year: [this.data.year, Validators.required],
      artist: [this.data.artist, Validators.required],
      photoUrl: [this.data.photoUrl],
      score: [this.data.score]
    
  })
    
    
  }
  updateAlbum(album: any): void {
    this.serviceService.updateAlbum(this.album).subscribe()
  }
}
