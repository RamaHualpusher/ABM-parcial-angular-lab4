import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ArticulosComponent } from './components/articulos/articulos.component';
import { ArticuloFormComponent } from './components/articulo-form/articulo-form.component';
import { ArticuloViewComponent } from './components/articulo-view/articulo-view.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component: ArticulosComponent },
  { path: 'articulo/view/:id', component: ArticuloViewComponent },
  { path: 'articulo', component: ArticuloFormComponent },
  { path: 'articulo/:id', component: ArticuloFormComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [
    AppComponent,
    ArticulosComponent,
    ArticuloFormComponent,
    ArticuloViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule, // Agrega esta línea
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
