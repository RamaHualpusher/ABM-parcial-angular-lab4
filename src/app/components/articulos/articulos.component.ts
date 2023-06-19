import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/models/Articulo';
import { Rubro } from 'src/app/models/Rubro';
import { ArticulosService } from 'src/app/services/articulos.service';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {
  articulos: Articulo[] = [];
  rubros: Rubro[] = [];
  selectedRubroId: number | null = null;

  constructor(private router: Router, private articulosService: ArticulosService) {}

  ngOnInit(): void {
    this.getRubros();
  }

  getRubros(): void {
    this.articulosService.getRubros().subscribe(rubros => {
      this.rubros = rubros;
      if (rubros.length > 0) {
        this.selectedRubroId = rubros[0].id;
        this.onRubroSelected();
      }
    });
  }

  onRubroSelected(): void {
    if (this.selectedRubroId) {
      this.articulosService.getArticulosPorRubro(this.selectedRubroId).subscribe(articulos => {
        this.articulos = articulos;
      });
    }
  }



  onAdd(): void {
    this.router.navigate(['/articulo']);
  }

  onEdit(articulo: Articulo): void {
    this.router.navigate(['/articulo', articulo.id]);
  }

  onDelete(articulo: Articulo): void {
    if (articulo.id !== undefined) {
      this.articulosService.deleteArticulo(articulo.id).subscribe(() => {
        this.articulos = this.articulos.filter(a => a.id !== articulo.id);
      });
    }
  }

  onView(articulo: Articulo): void {
    this.router.navigate(['/articulo/view', articulo.id]);
  }
}

