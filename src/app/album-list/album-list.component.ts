import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { UpdateAlbumDialogComponent } from '../update-album-dialog/update-album-dialog.component';
@Component({
  selector: 'album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {
  albumList: Array<any> = [];

  constructor( private http: HttpClient, public dialog: MatDialog) { }
  data: any; //Creo variable data para que el newalbumdialog me devuelva los datos que coge en el get
  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/album').subscribe((data: Array<any>) =>{
      this.albumList = data;
      console.log(data)
    }
    
    );
  }
  openDialogUpdateAlbum(album:any, i:any) { //copio la funcion openDialog para que funione el boton edit igual que con el cancel. Importo MatDialog para que funcione igual que newalbum
    this.dialog.open(UpdateAlbumDialogComponent, {data: this.albumList[i]});//llamo al componente UpdateAlbumDialogComponent cogiendo a data del album con el indice
  }
  deleteAlbum(album: any, i: number) {
    this.http.delete(`http://localhost:3000/album/${album._id}`).subscribe();
    this.albumList.splice(i, 1);
  }
}