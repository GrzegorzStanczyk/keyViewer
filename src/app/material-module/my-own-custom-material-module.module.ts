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
  MdCardModule } from '@angular/material';

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
    MdCardModule
  ],
  exports: [
    MdButtonModule, 
    MdCheckboxModule, 
    MdToolbarModule,
    MdIconModule,
    MdButtonToggleModule, 
    MdSidenavModule,
    MdTooltipModule,
    MdCardModule
  ],
  declarations: []
})
export class MyOwnCustomMaterialModuleModule { }
