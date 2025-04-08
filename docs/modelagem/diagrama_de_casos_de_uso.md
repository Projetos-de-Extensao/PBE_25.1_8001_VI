---
id: diagrama_de_casos_de_uso
title: Diagrama de Casos de uso
---

## Diagrama de Casos de usos

### Versão 1.0

```puml
<style>
document {
  BackGroundColor #white
}
root {
  FontColor #black
  LineColor #black
}
legend{
    FontColor white
    BackGroundColor white
}
</style>
@startuml

actor :Cliente: as A
usecase "cadastro de usuario" #white
usecase "login de cadastro" #white
usecase "e-mail e senha" #white
usecase "conta google" #white
usecase "realizar pedidos" #white
usecase "sem endereco" #white
usecase "pedir a 2 enderecos" #white
usecase "editar dados pessoais" #white
usecase "cadastrar mais endereco" #white
usecase "pesquisar produtos" #white
usecase "adiciona produto" #white
usecase "remover produto" #white
usecase "tipo de entrega" #white
usecase "rapido" #white
usecase "grande" #white

A ---> (cadastro de usuario)

A ---> (login de cadastro)
(login de cadastro) --> (e-mail e senha): <<extend>>
(login de cadastro) --> (conta google): <<extend>>

A ---> (realizar pedidos)
(realizar pedidos) --> (sem endereco): <<extend>>
(realizar pedidos) --> (pedir a 2 enderecos): <<extend>>

A ---> (editar dados pessoais)

A ---> (cadastrar mais endereco)

A ---> (pesquisar produtos)

A ---> (adiciona produto)

A ---> (remover produto)

A ---> (tipo de entrega)
(tipo de entrega) --> (rapido): <<extend>>
(tipo de entrega) --> (grande): <<extend>>
@enduml
```

## Referências

> UML Class and Object Diagrams Overview. Disponível em https://www.uml-diagrams.org/class-diagrams-overview.html. Acesso em 21/09/20

> UML Class Diagram Tutorial. Disponível em https://www.youtube.com/watch?v=UI6lqHOVHic. Acesso em 21/09/20

> UML Class Relationship Diagrams. Disponível em https://www.cs.odu.edu/~zeil/cs330/latest/Public/classDiagrams/index.html#other-class-diagram-elements Acesso em 19/10/20

## Autor(es)

| Data | Versão | Descrição | Autor(es) |
| -- | -- | -- | -- |
| 21/09/20 | 1.0 | Criação do documento | João Pedro, Lucas Alexandre, Matheus Estanislau, Moacir Mascarenha e Renan Cristyan |
| 28/09/20 | 1.1 | Ajustes no documento | João Pedro e Renan Cristyan |
| 28/09/20 | 1.2 | Adicionado diagrama de classes 1.1 | João Pedro e Renan Cristyan |
| 26/10/20 | 2.0 | Adicionado diagrama de classes 2.0 | João Pedro, Lucas Alexandre, Matheus Estanislau, Moacir Mascarenha e Renan Cristyan |