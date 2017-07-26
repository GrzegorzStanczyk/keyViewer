import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MdButtonModule, 
  MdCheckboxModule, 
  MdToolbarModule, 
  MdIconModule, 
  MdButtonToggleModule, 
  MdSidenavModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonToggleModule, 
    MdSidenavModule
  ],
  exports: [
    MdButtonModule, 
    MdCheckboxModule, 
    MdToolbarModule,
    MdIconModule,
    MdButtonToggleModule, 
    MdSidenavModule
  ],
  declarations: []
})
export class MyOwnCustomMaterialModuleModule { }
