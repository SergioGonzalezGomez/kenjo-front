import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ServiceService } from '../services/service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    photoUrl: '', 
    score: ''
  };
  albumForm!: FormGroup;
  suscription?: Subscription;

  constructor(private http: HttpClient, private serviceService: ServiceService, private fb: FormBuilder) {
    
   }

  ngOnInit(): void { 
    this.albumForm = this.fb.group({
     
        title: ['', Validators.required],
        year: [1900, Validators.required],
        artist: ['', Validators.required],
        photoUrl: [''],
        score: ['']
      
    })
  }
  createNewAlbum(album: any): void {
   album = {
    title: this.albumForm.value.title,
    year: this.albumForm.value.year,
    artist: this.albumForm.value.artist,
    photoUrl: this.albumForm.value.photoUrl,
    score: this.albumForm.value.score
   }
   

    this.serviceService.createNewAlbum(album).subscribe();
  }


/*FUNCTION WITHOUT THE SERVICE  
createNewAlbum(album: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post<any>('http://localhost:3000/album/create', JSON.stringify(album), httpOptions).subscribe();
  } */

}