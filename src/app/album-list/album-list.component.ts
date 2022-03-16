import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { UpdateAlbumDialogComponent } from '../update-album-dialog/update-album-dialog.component';
import { Subscription } from 'rxjs';
import { ServiceService } from '../services/service.service';
@Component({
  selector: 'album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit, OnDestroy {

  albumList: Array<any> = [];
  suscription!: Subscription;
  constructor( private http: HttpClient, public dialog: MatDialog, private serviceService: ServiceService) { }
  data: any; //Creo variable data para que el newalbumdialog me devuelva los datos que coge en el get
  ngOnInit(): void {
    this.getAlbum();
    this.suscription = this.serviceService.refresh$.subscribe(() => {
      this.getAlbum();
      console.log("prueba subscribe");
    })
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
    console.log("prueba unsuscribe"); //NO LO HACE ???
    
  }
  openDialogUpdateAlbum(album:any, i:any) { //copio la funcion openDialog para que funione el boton edit igual que con el cancel. Importo MatDialog para que funcione igual que newalbum
    this.dialog.open(UpdateAlbumDialogComponent, {data: this.albumList[i]});//llamo al componente UpdateAlbumDialogComponent cogiendo a data del album con el indice
    /* this.albumList[i] = album; //Esto debe estar en el updateAlbum */
    /* console.log(album); */
    /* this.ngOnInit() */
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