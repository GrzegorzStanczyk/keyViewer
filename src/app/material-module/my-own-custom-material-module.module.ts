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
  MdPaginatorModule } from '@angular/material';

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
    MdPaginatorModule
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
    MdPaginatorModule
  ],
  declarations: []
})
export class MyOwnCustomMaterialModuleModule { }
