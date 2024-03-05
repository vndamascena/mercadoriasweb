import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-mercadorias-consulta',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './mercadorias-consulta.component.html',
  styleUrl: './mercadorias-consulta.component.css'
})
export class MercadoriasConsultaComponent implements OnInit {
  //atributos
  mercadorias: any[] = []; // array de objestos
  mensagem: string = ''; //exibir mensagem na página

  //construtor para inicializar os atributos da classe
  constructor(
    private httpClient: HttpClient
  ) { }
  //método executado quando o componente
  //for inicializado / carregado na tela
  ngOnInit(): void {
    //executando uma chamada para a consulta de produtos da API
    this.httpClient.get(environment.apiUrl + '/mercadorias')
      .subscribe({ //capturar o retorno da consulta da API
        next: (data) => { //resultado de sucesso

          // guarda os dados obitidos 
          this.mercadorias = data as any[];


        },
        error: (e) => { //resultado de erro
          console.log(e); //exibindo no console do navegador
        }
      })
  }

  //método executado quando o botão
  //de exclusão for clicado
  onDelete(id: string): void {
    //solicitar a confirmação do usuário
    if (confirm('Deseja realmente excluir a mercadoria selecionada?')) {
      //enviando uma requisição HTTP DELETE para a API
      this.httpClient.delete(environment.apiUrl + "/mercadorias/" + id)
        .subscribe({ //capturando o retorno da API
          next: (data: any) => { //sucesso..
            this.mensagem = data.message; //armazenando a mensagem obtida
            this.ngOnInit(); //executando uma nova consulta de produtos
          },
          error: (e) => { //erro..
            console.log(e.error);
          }
     } )
    }
  }

}
