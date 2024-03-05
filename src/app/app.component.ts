import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MercadoriasConsultaComponent } from './mercadorias-consulta/mercadorias-consulta.component';
import { MercadoriasCadastroComponent } from './mercadorias-cadastro/mercadorias-cadastro.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    MercadoriasConsultaComponent,
    MercadoriasCadastroComponent
  
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mercadoriasweb';
}
