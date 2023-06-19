import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ArticulosService } from 'src/app/services/articulos.service';
import { Rubro } from 'src/app/models/Rubro';
import { Articulo } from 'src/app/models/Articulo';

@Component({
  selector: 'app-articulo-form',
  templateUrl: './articulo-form.component.html',
  styleUrls: ['./articulo-form.component.css']
})
export class ArticuloFormComponent implements OnInit {
  titulo: string = 'Nuevo Articulo';
  articuloForm = new FormGroup({
    id: new FormControl(''),
    codigo: new FormControl(''),
    denominacion: new FormControl(''),
    precio: new FormControl(''),
    idrubro: new FormControl('')
  });
  showAlert: boolean = false;
  rubros: Rubro[] = [];
  articulo: Articulo | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private articulosService: ArticulosService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.articulosService.getRubros().subscribe(rubros => {
      this.rubros = rubros;
      this.titulo = id ? 'Editar Articulo' : 'Nuevo Articulo';
    });

    if (id) {
      this.articulosService.getArticulo(Number(id)).subscribe(articulo => {
        this.articulo = articulo;
        this.articuloForm.setValue({
          id: articulo.id ? articulo.id.toString() : '',
          codigo: articulo.codigo,
          denominacion: articulo.denominacion,
          precio: articulo.precio ? articulo.precio.toString() : '',
          idrubro: articulo.idrubro ? articulo.idrubro.toString() : ''
        });
      });
    }
  }

  onSubmit(): void {
    const articulo: Partial<Articulo> = {
      id: this.articuloForm.value.id ? Number(this.articuloForm.value.id) : undefined,
      codigo: this.articuloForm.value.codigo ?? undefined,
      denominacion: this.articuloForm.value.denominacion ?? undefined,
      precio: this.articuloForm.value.precio ? Number(this.articuloForm.value.precio) : undefined,
      idrubro: this.articuloForm.value.idrubro ? Number(this.articuloForm.value.idrubro) : undefined
    };

    if (articulo.codigo !== undefined && articulo.codigo !== null) {
      this.articulosService.getArticulosPorCodigo(articulo.codigo).subscribe(existingArticulos => {
        const existingArticulo = existingArticulos[0]
        if (existingArticulo && existingArticulo.id !== articulo.id?.toString()) {
          console.log("Articulo duplicado");
          console.log("Articulo duplicado: "+ JSON.stringify(existingArticulo));
          console.log("Articulo enviado: "+ JSON.stringify(articulo));
          console.log(existingArticulo.id);
          console.log(articulo.id);
          console.log(existingArticulo.id !== articulo.id);


          this.showAlert = true;
          setTimeout(() => this.showAlert = false, 3000);
        } else {
          if (articulo.id) {
            this.articulosService.putArticulo(articulo as Articulo).subscribe(() => this.router.navigate(['/articulos']));
          } else {
            this.articulosService.postArticulo(articulo as Articulo).subscribe(() => this.router.navigate(['/articulos']));
          }
        }
      });
    }
  }


  onCancel(): void {
    this.router.navigate(['/articulos']);
  }
}
