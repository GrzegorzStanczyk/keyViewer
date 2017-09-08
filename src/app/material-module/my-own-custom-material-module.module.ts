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
  MdSnackBarModule,
  MdDialogModule } from '@angular/material';

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
    MdSnackBarModule,
    MdDialogModule
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
    MdSnackBarModule,
    MdDialogModule
  ],
  declarations: []
})
export class MyOwnCustomMaterialModuleModule { }
