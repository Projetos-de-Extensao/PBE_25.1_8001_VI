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
actor :Sistema: as S
usecase "cadastro de usuario" #white
usecase "login de cadastro" #white
usecase "e-mail e senha" #white
usecase "realizar pedidos" #white
usecase "sem endereco" #white
usecase "editar dados pessoais" #white
usecase "cadastrar mais endereco" #white
usecase "pesquisar produtos" #white
usecase "adiciona produto" #white
usecase "remover produto" #white
usecase "exibir status do pedido" #white
usecase "processar pagamento" #white
usecase "exibir frete" #white
usecase "exibir tipos de entrega" #white
usecase "cancela pedido" #white
usecase "realizar pagamento" #white
usecase "PIX" #white
usecase "Cartão de débito" #white
usecase "Cartão de crédito" #white
usecase "notificar atrasos" #white

A ---> (cadastro de usuario)

A --left-> (login de cadastro)
(login de cadastro) -left-> (e-mail e senha): <<extend>>
(login de cadastro) --> (conta google): <<extend>>

A ---> (realizar pedidos)
(realizar pedidos) --> (sem endereco): <<extend>>
(realizar pedidos) --> (pedir ate 2 enderecos): <<extend>>

A --up-> (editar dados pessoais)

A --up-> (cadastrar mais endereco)

A --up-> (pesquisar produtos)

A --up-> (adiciona produto)

A --up-> (remover produto)

A --up-> (cancela pedido)

A ---> (realizar pagamento)
(realizar pagamento) --> (Cartão de crédito): <<extend>>
(realizar pagamento) --> (PIX): <<extend>>
(realizar pagamento) --> (Cartão de débito): <<extend>>

S -up--> (rastrear pedidos)
S -up--> (exibir status do pedido)
S ---> (processar pagamento)
S ---> (exibir frete)
S ---> (notificar atrasos)
S ---> (exibir tipos de entrega)
@enduml
```

## Referências

> UML Class and Object Diagrams Overview. Disponível em https://www.uml-diagrams.org/class-diagrams-overview.html. Acesso em 21/09/20

> UML Class Diagram Tutorial. Disponível em https://www.youtube.com/watch?v=UI6lqHOVHic. Acesso em 21/09/20

> UML Class Relationship Diagrams. Disponível em https://www.cs.odu.edu/~zeil/cs330/latest/Public/classDiagrams/index.html#other-class-diagram-elements Acesso em 19/10/20

## Autor(es)

| Data | Versão | Descrição | Autor(es) |
| -- | -- | -- | -- |
| 08/04/25 | 1.0 | Criação do documento | João Pedro, Pedro Silvestre |
| 09/06/25 | 1.0 | Atualização do documento | João Pedro Borges Souza Santana |
