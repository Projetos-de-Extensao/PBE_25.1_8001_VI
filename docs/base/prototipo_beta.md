---
id: prototipobeta
title: Protótipo Beta
---

## Introdução
 
<p align = "justify">
A construção do protótipo para auxilia a equipe de desenvolvimento a encontrar um nível de detalhes abrangentes, extrair funcionalidades, e também fornece uma base para o gerenciamento do projeto pois com o protótipo é possível realizar estimativas de quanto tempo será necessário desempenhar em cada funcionalidade.
</p>
 
## Metodologia
 
<p align = "justify">
Iniciamos o projeto através dos levantamentos iniciais da equipe, após discussões a ferramenta PlanUml foi selecionada para produzir o protótipo.
</p>
 
## Protótipo
 
### Versão Beta
 
### Tela Login e cadastro
```puml
@startsalt

{+
{*<b> Sistema de Login e Cadastro }
    
    {/ <b>Login | Cadastro }
    {
    @ E-mail:| "exemplo@gmail.com "
    <&key> Senha: | "****              "
    [<&account-login> Login ] | [Esqueci minha senha]
    ..
    Login com: | [Google]
    }
    --
    --
    {/ Login | <b>Cadastro }
    {
    <&person> Nome: | "            " 
    @ E-mail: | "            "
    <&key> Senha: | "            "
    }
    [X] Concordo com os Termos de uso
    {
    [ Criar conta ] | [ Voltar ]
  }
}

@endsalt
```

### Tela de Perfil
```puml
@startsalt

{+
  {*<b> Sistema de Perfil }
    
    {/ <b>Status do pedido | Formas de pagamento}
    {
    <&person> Nome: | "John Doe          "
    @ E-mail:| "exemplo@gmail.com "
    <&key> Senha: | "****              "
    <&map-marker> Endereço: | "                  "
    <&map-marker> Endereço 2: | "                  "
    }
    [Formas de pagameto]
    [Editar perfil]
    --
    --
    {/ Perfil | <b>Formas de pagamento}
    {
    <&credit-card> Cartão 1:  3456**
    {  
    [Editar] | [Excluir]
    }
    <&credit-card> Cartão 2:  8743**
    {
    [Editar] | [Excluir]
    }
    }
    {
    [Adicionar] | [ Voltar ]
  }
}

@enduml
```

### Tela de Pedidos
```puml
@startsalt

{+
  {*<b> Sistema de Pedidos }
    
    {/ <b>Pedidos | Acompanhar pedido}
    {
    Pedido 1:  A caminho    
    }
    [Acompanhar]
    {
    Pedido 2:  Em preparo
    }
    [Acompanhar]
    --
    --
    {/ Pedidos | <b>Acompanhar pedido}
    {
    Pedido 1: 
    A caminho
    --
    <&map-marker> - - - o - - <&home>
    --
    [ voltar ] | [Cancelar]
    }
}

@enduml
```

### Tela de Produtos e Compra
```puml
@startsalt

{+
  {*<b> Sistema de compra }
  {/ <b>Tela de produtos | Tela de produto | Tela de compra}
    {
    [ <&image>Produto 1] | [ <&image>Produto 2]
    --
    [ <&image>Produto 3] | [ <&image>Produto 4]
    --
    [ <&image>Produto 5] | [ <&image>Produto 6]
    }
    --
    --
  {/ Tela de produtos | <b>Tela de produto | Tela de compra}
  Produto 1:
  --
  <&image>
  --
  Descrição 
  {
   Preço  |  Frete 
  --
  [Comprar] | [Voltar]
  }
  --
  --
  {/ Tela de produtos | Tela de produto | <b>Tela de compra}
  Produto 1:
  <&image>
  {
  Preço 
  Estimativa de entrega
  [Escolher forma de pagamento] | [Voltar]
  }
}

@enduml
```

<p align = "justify">
Na primeira versão do protótipo utilizamos a ferramenta PlantUml para criar o protótipo
</p>
 
## Referências
 
> Material Design Color Tool. Disponível em:  https://material.io/resources/color/#!/?view.left=0&view.right=0
 
> PMI. Um guia do conhecimento em gerenciamento de projetos. Guia PMBOK® 5a. ed. EUA: Project Management Institute, 2013.
 
> Ferramenta Figma. Disponível em https://www.figma.com
 
## Autor(es)
 
| Data | Versão | Descrição | Autor(es) |
| -- | -- | -- | -- |
| 08/04/25 | Beta | Criação do documento | Rodrigo de Sousa Ferrett |