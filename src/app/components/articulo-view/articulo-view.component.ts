import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from 'src/app/models/Articulo';
import { ArticulosService } from 'src/app/services/articulos.service';

@Component({
  selector: 'app-articulo-view',
  templateUrl: './articulo-view.component.html',
  styleUrls: ['./articulo-view.component.css']
})
export class ArticuloViewComponent implements OnInit {
  articulo: Articulo | null = null;

  constructor(private route: ActivatedRoute, private articulosService: ArticulosService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articulosService.getArticulo(Number(id)).subscribe(articulo => {
        this.articulo = articulo;
      });
    }
  }
}
