---
id: mapa_mental
title: Mapas Mentais
---

## Introdução

<p align = "justify">
Mapa mental consiste em criar resumos cheios de símbolos, cores, setas e frases de efeito com o objetivo de organizar o conteúdo e facilitar associações entre as informações destacadas. Esse material é muito indicado para pessoas que têm facilidade de aprender de forma visual.
</p>

## Metodologia

<p align = "justify">
Foi levantado um ponto importante sobre o app e, assim, foi produzido o mapa mental. O documento foi produzido utilizando a ferramenta plantuml.
</p>

## Mapa mental - Geral.

## Versão 1.0

### Mapa mental 1
```puml
@startmindmap

<style>
document {
  BackGroundColor #1e2129
}
root {
  FontColor #white
  LineColor white
}
legend{
    FontColor Black
    BackGroundColor white
}
</style>

legend left
|= |= Tipo |
|<back:Purple>   </back>| Solução |
|<back:Indigo>   </back>| Agentes |
|<back:BlueViolet>   </back>| Funcionalidades |
endlegend

*[#Purple] Aplicativo delivery \n para ilha primeira

**[#Indigo] Usuário
***[#BlueViolet] Cadastro/Login
****[#BlueViolet] Dados pessoais
****[#BlueViolet] Endereço
****[#BlueViolet] Formas de pagamento
***[#BlueViolet] Escolha de produtos
****[#BlueViolet] Navegação/Pesquisa de produtos
****[#BlueViolet] Descrição/Imagem/Preço
***[#BlueViolet] Carrinho
***[#BlueViolet] Confirmação do \n produto
**[#Indigo] Ilha delivery
***[#BlueViolet] Receber pedido
***[#BlueViolet] Calculo do preço
***[#BlueViolet] Efetuação da entrega
***[#BlueViolet] Notificar o usuário

left side

**[#Indigo] Sistema
***[#BlueViolet] Fluxo de Pedidos
***[#BlueViolet] Notificações
***[#BlueViolet] Pagamentos
****[#BlueViolet] Formas de pagamentos
***[#BlueViolet] Gerenciamento de pedidos
***[#BlueViolet] Relatórios
****[#BlueViolet] Vendas, entregas e \n feedbacks dos usuários

@endmindmap
```

### Mapa mental 2

[![Mapa mental Brainstorm](../assets/Mapas_mentais/...png)](assets/Mapas_mentais/....png)

## Conclusão

<p align = "justify">
O mapa mental é uma ficha de estudos que ajuda a dar uma visão geral do tema, e ajuda a fixar os pontos mais importantes sobre o app.
</p>

## Referências
> Mapa MentalXXX,  Disponível em: https://www.....

> Ferramentas para Mapas Mentais. Disponível em: https://www....

> Plataforma para usuários colaborar no desenho... Disponível em: https://...

## Versionamento
| Data | Versão | Descrição | Autor(es) |
| -- | -- | -- | -- |
| 25/03/25 | 1.0 | Criação do documento | Rodrigo de Sousa Ferrett |
| dd/mm/yy | 2.0 | Adicionado Mapa mental 2 | xxxx xxxx |
