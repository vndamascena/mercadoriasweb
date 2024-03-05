import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from
  '@angular/forms';
@Component({
  selector: 'app-mercadorias-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './mercadorias-cadastro.component.html',
  styleUrl: './mercadorias-cadastro.component.css'
})
export class MercadoriasCadastroComponent implements OnInit {
  //atributos
  categorias: any[] = [];
  fornecedores: any[] = [];
  mensagem: string = '';
  //construtor
  constructor(
    private httpClient: HttpClient
  ) {
  }
  //criando a estrutura do formulário
  form = new FormGroup({
    nome: new FormControl('', [
      //campo 'nome'
      Validators.required,
      Validators.pattern(/^[A-Za-zÀ-Üà-ü0-9\s]{8,100}$/)
    ]),
    //campo 'preco'
    preco: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(999999)
    ]),
    //campo 'quantidade'
    quantidade: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(9999)
    ]),
    //campo 'categoriaId'
    categoriaId: new FormControl('', [
      Validators.required
    ]),
    //campo 'categoriaId'
    fornecedorId: new FormControl('', [
      Validators.required
    ])
  });

  //função auxiliar para exibir na página as mensagens de erro
  //conforme os erros de validação do formulário
  get f(): any {
    return this.form.controls;
  }

  //função executada no momento em que o componente é carregado
  ngOnInit(): void {
    //executando o endpoint de consulta de categorias na API
    this.httpClient.get(environment.apiUrl + "/categorias")
      .subscribe({
        next: (data) => {
          this.categorias = data as any[];
        },
        error: (e) => {
          console.log(e.error);
        }
      });
    //executando o endpoint de consulta de fornecedores na API
    this.httpClient.get(environment.apiUrl + "/fornecedor")
      .subscribe({
        next: (data) => {
          this.fornecedores = data as any[];
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }
  //função para capturar o evento submit do formulário
  onSubmit(): void {
    //enviando uma requisição POST para a API
    this.httpClient.post(environment.apiUrl + "/mercadorias",
      this.form.value)
      .subscribe({
        next: (data: any) => {
          this.mensagem = data.message;
          this.form.reset(); //limpar os campos do formulário
        },
        error: (e) => {
          console.log(e.error);
          this.mensagem = 'Falha ao cadastrar o produto.';
        }
      });
  }
}