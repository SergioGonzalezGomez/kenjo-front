import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { UpdateAlbumDialogComponent } from '../update-album-dialog/update-album-dialog.component';
import { Subscription } from 'rxjs';
import { ServiceService } from '../services/service.service';
import { ScoreComponent } from '../score/score.component';


@Component({
  selector: 'album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit, OnDestroy {
  
  albumList: Array<any> = [];
  suscription!: Subscription;
  constructor( private http: HttpClient, public dialog: MatDialog, private serviceService: ServiceService) { }
  data: any; //I created the data variable in order to get the data that newAlbumDialog provides with GET 
  ngOnInit(): void {
    this.getAlbum();
    this.suscription = this.serviceService.refresh$.subscribe(() => {
      this.getAlbum();
    })
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  openDialogUpdateAlbum(album:any, i:any) { 
    this.dialog.open(UpdateAlbumDialogComponent, {data: this.albumList[i]});
  }

  openDialogScoreAlbum(album:any, i:any) { 
    this.dialog.open(ScoreComponent, {data: this.albumList[i]});
  }

  deleteAlbum(album: any, i: number) {
    this.http.delete(`http://localhost:3000/album/${album._id}`).subscribe();
    this.albumList.splice(i, 1);
  }
  
  getAlbum() {
    this.serviceService.getAlbum().subscribe((data: any) => {
      this.albumList = data;   
    })
  }
}