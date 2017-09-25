# keyViewer
> Hello! Feel free to sign up to the application, and use it to make your life easier :)

## Introduction
[Live preview](https://keyviewer-d5825.firebaseapp.com/)

## App purpose
Created to help me with my work. In short words. 
I create a note based on location.
And app shows me the note/key which is nearest to my current location.
And that is it. App is simple, good looking, and save my time.

## Showcase
Get acces to the app
![Gif Showing how to sign up / sign in to the app](./src/static/gif/signin.gif)

Add new items
![Gif Showing how to add new items](./src/static/gif/addnew.gif)

Edit item
![Gif Showing how to edit item](./src/static/gif/edit.gif)

Edit item from the items list
![Gif Showing how to edit item from the items list](./src/static/gif/editlist.gif)

Delete item
![Gif Showing how to delete item](./src/static/gif/delete.gif)

Filtering the list of items
![Gif Showing how filter the list of items](./src/static/gif/filter.gif)

Change app theme
![Gif Showing how change app theme](./src/static/gif/settings.gif)

# Repository documentation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.1.

## Installing / Getting started

If you have not yet installed the angular-cli run `npm install -g @angular/cli`, next  
Run `npm install` to install dependencies  
You must add `environment` file containing your own firebase enviorment to path `./src/app/environments/environment.ts`
```
export const environment = {
  production: false,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  }
};
```
You can found in your project at the [Firebase Console](https://console.firebase.google.com)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Api Reference

1. [Google Maps APIs](https://developers.google.com/maps/)
2. [Material Design](https://material.angular.io/)
3. [AngularFire2](https://github.com/angular/angularfire2)
4. [ngx-translate](http://www.ngx-translate.com/) - The internationalization (i18n) library for Angular 2+

## Database

[Firebase](https://firebase.google.com/) - Every user have its own database

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Licensing

Please contact me if you want use or modify application to your purposes.