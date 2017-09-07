import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MdButtonModule, 
  MdCheckboxModule, 
  MdToolbarModule, 
  MdIconModule, 
  MdButtonToggleModule, 
  MdSidenavModule,
  MdTooltipModule,
  MdCardModule,
  MdInputModule,
  MdProgressSpinnerModule,
  MdPaginatorModule,
  MdSnackBarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonToggleModule, 
    MdSidenavModule,
    MdTooltipModule,
    MdCardModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdPaginatorModule,
    MdSnackBarModule
  ],
  exports: [
    MdButtonModule, 
    MdCheckboxModule, 
    MdToolbarModule,
    MdIconModule,
    MdButtonToggleModule, 
    MdSidenavModule,
    MdTooltipModule,
    MdCardModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdPaginatorModule,
    MdSnackBarModule
  ],
  declarations: []
})
export class MyOwnCustomMaterialModuleModule { }
