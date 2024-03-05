import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl, FormGroup, FormsModule, ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-mercadorias-edicao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './mercadorias-edicao.component.html',
  styleUrl: './mercadorias-edicao.component.css'
})
export class MercadoriasEdicaoComponent implements OnInit {
  //atributos
  categorias: any[] = [];
  fornecedores: any[] = [];
  mensagem: string = '';
  //construtor
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  //função executada no momento em que o componente é aberto
  ngOnInit(): void {
    //capturar o id do produto enviado na URL
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    //consultando o produto na API através do ID
    this.httpClient.get(environment.apiUrl + "/mercadorias/" + id)
      .subscribe({
        next: (data: any) => {
          //preenchendo os campos do formulário
          this.form.controls['id'].setValue(data.id);
          this.form.controls['nome'].setValue(data.nome);
          this.form.controls['preco'].setValue(data.preco);
          this.form.controls['quantidade'].setValue(data.quantidade);
          this.form.controls['fornecedorId'].setValue
            (data.fornecedor.id);

          this.form.controls['categoriaId'].setValue(data.categoria.id);
        },
        error: (e) => {
          console.log(e.error);
        }
      });
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
  //criando a estrutura do formulário
  form = new FormGroup({
    //campo 'id'
    id: new FormControl(''),
    //campo 'nome'
    nome: new FormControl('', [
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
  //função para atualizar o produto
  onSubmit(): void {
    //fazendo uma requisição HTTP PUT para a API
    this.httpClient.put(environment.apiUrl + "/mercadorias",
      this.form.value)
      .subscribe({
        next: (data: any) => {
          this.mensagem = data.message;
          this.form.reset(); //limpar os campos do formulário
        },
        error: (e) => {
          console.log(e.error);
          
        }
      });
  }

}
