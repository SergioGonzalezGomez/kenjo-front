import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {
  selected = 0;  
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,  private serviceService: ServiceService) { }

  ngOnInit(): void {
  }

  onSelect(): void {
    this.data.id = this.data._id;
    this.data.score = this.selected;
    this.serviceService.updateAlbum(this.data).subscribe()
  }
}
