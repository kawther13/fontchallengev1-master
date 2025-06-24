import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Region } from '../../models/region';
import { RegionService } from '../../service/region.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-region',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,CommonModule],
  templateUrl: './add-region.component.html',
  styleUrl: './add-region.component.css'
})
export class AddRegionComponent {

regionForm: FormGroup;
  regions: Region[] = [];
  selectedRegionId: number | null = null;
  message: string = '';

  constructor(private fb: FormBuilder, private regionService: RegionService) {
    this.regionForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadRegions();
  }

  loadRegions() {
    this.regionService.getAllRegions().subscribe(data => {
      this.regions = data;
    });
  }

  onSubmit() {
    if (this.selectedRegionId) {
      // Update
      this.regionService.updateRegion(this.selectedRegionId, this.regionForm.value)
        .subscribe(updated => {
          this.message = `Région mise à jour : ${updated.name}`;
          this.resetForm();
          this.loadRegions();
        });
    } else {
      // Create
      this.regionService.createRegion(this.regionForm.value)
        .subscribe(created => {
          this.message = `Région ajoutée : ${created.name}`;
          this.resetForm();
          this.loadRegions();
        });
    }
  }

  editRegion(region: Region) {
    this.regionForm.patchValue({
      name: region.name
    });
    this.selectedRegionId = region.id || null;
  }

  deleteRegion(id: number) {
    if (confirm("Voulez-vous vraiment supprimer cette région ?")) {
      this.regionService.deleteRegion(id).subscribe(() => {
        this.message = 'Région supprimée.';
        this.loadRegions();
      });
    }
  }

  resetForm() {
    this.regionForm.reset();
    this.selectedRegionId = null;
  }
}
