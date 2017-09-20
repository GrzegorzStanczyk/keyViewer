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
  MdDialogModule,
  MdExpansionModule,
  MdProgressBarModule } from '@angular/material';

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
    MdDialogModule,
    MdExpansionModule,
    MdProgressBarModule
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
    MdDialogModule,
    MdExpansionModule,
    MdProgressBarModule
  ],
  declarations: []
})
export class MyOwnCustomMaterialModuleModule { }
