import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-add-player-dialog',
  standalone: true,
  imports: [MatInputModule, MatDialogModule, FormsModule, AddPlayerDialogComponent],
  templateUrl: './add-player-dialog.component.html',
  styleUrl: './add-player-dialog.component.scss'
})
export class AddPlayerDialogComponent {

  name: string = '';
  
  constructor(public dialogRef: MatDialogRef<AddPlayerDialogComponent>,){ }

  onNoClick(){
    this.dialogRef.close();
  }
}


