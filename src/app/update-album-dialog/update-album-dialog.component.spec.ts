import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAlbumDialogComponent } from './update-album-dialog.component';

describe('UpdateAlbumDialogComponent', () => {
  let component: UpdateAlbumDialogComponent;
  let fixture: ComponentFixture<UpdateAlbumDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAlbumDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAlbumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
