import { Routes } from '@angular/router';
import { MercadoriasCadastroComponent } from './mercadorias-cadastro/mercadorias-cadastro.component';
import { MercadoriasConsultaComponent } from './mercadorias-consulta/mercadorias-consulta.component';
import { MercadoriasEdicaoComponent } from './mercadorias-edicao/mercadorias-edicao.component';

export const routes: Routes = [
    {
        path: 'mercadorias-cadastro', component: MercadoriasCadastroComponent
    },
    {
        path: 'mercadorias-consulta', component: MercadoriasConsultaComponent
    },
    {
        path: 'mercadorias-edicao/:id', component: MercadoriasEdicaoComponent
    },

    {
        path: '', pathMatch: 'full', //url raiz
        redirectTo: 'mercadorias-consulta'
    }





];   
