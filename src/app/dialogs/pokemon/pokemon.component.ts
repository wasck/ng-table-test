import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pokemon } from 'src/app/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PokemonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {pokemon: Pokemon, index: number}
  ) { }

  public ngOnInit(): void {
    this.initializeForm();
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      name: [this.data?.pokemon?.name || '']
    });
  }

}
