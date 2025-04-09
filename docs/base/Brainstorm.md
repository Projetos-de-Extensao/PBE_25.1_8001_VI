---
id: brainstorm
title: Brainstorm
---

## Introdução
<p align = "justify">
O brainstorm é uma técnica de elicitação de requisitos que consiste em reunir a equipe e discutir sobre diversos tópicos gerais do projeto apresentados no documento problema de negócio. No brainstorm o diálogo é incentivado e críticas são evitadas para permitir que todos colaborem com suas próprias ideias.
</p>

## Metodologia
<p align = "justify">
A equipe se reuniu para debater ideias gerais sobre o projeto via aula presencial, iniciando a sessão às 10h00 e finalizando às 11h40 do dia 25/03/2025. O participante Rafael Viana atuou como moderador da reunião, conduzindo os tópicos com base em perguntas previamente elaboradas, organizando as falas e transcrevendo as contribuições para este documento.
</p>

## Brainstorm

## Versão 1.0

## Perguntas

### 1. Qual o objetivo principal da aplicação?

<p align = "justify">
<b>Pedro Henrique Silvestre</b> - A plataforma deve fornecer um sistema logístico que integre comércios locais e barqueiros, garantindo entregas seguras, rápidas e rastreáveis
</p>

<b>Rodrigo de Sousa </b> - Deve ser uma plataforma onde qualquer pessoa possa solicitar entregas para a Ilha Primeira de maneira prática, com acompanhamento em tempo real e facilidade no pagamento.

<b>João Pedro Borges</b> - O objetivo da aplicação é suprir uma demanda real de conveniência, focando em quem mora ou frequenta a ilha e não quer se deslocar até o continente para itens básicos ou refeições.

<b>Lucas Alves</b> - O principal objetivo da aplicação é a criação de um ecossistema de delivery adaptado à logística insular, permitindo que restaurantes, mercados e farmácias operem com mais eficiência.

<b>Rafael Viana</b> - A plataforma deve gerenciar pedidos, pagamentos, rotas de entrega e agendamento com os barqueiros, automatizando o processo e diminuindo o tempo de resposta.

</p>

---

### 2. Como será o processo para cadastrar um novo cliente?

<p align = "justify">
<b>Pedro Silvestre</b> - O cliente deve fazer login ao iniciar o aplicativo e caso não possua conta, o cliente pode se cadastrar.</p>

 <p align = "justify">
<b>João Pedro</b> - O cadastro pode ser feito de duas formas: inserindo e-mail e criando uma senha no app ou fazendo login com a conta Google.</p>

<p align = "justify">
<b>Rafael Viana</b> - Após o cadastro, com o usuário logado, o sistema redireciona o cliente para a página inicial e o cadastra automaticamente no banco de dados.
 </p>
---

### 3. Como adicionar produtos?

<p align = "justify">
<b>João Pedro</b> - Após o login, o cliente pode escolher entre duas opções de entrega: delivery (entregas rápidas de alimentos e similares) ou entregas grandes (produtos maiores como eletrônicos e roupas).
</p>

<p align = "justify">
<b>Pedro Silvestre</b> - O cliente insere o tipo de produto a ser entregue e o link correspondente a sua venda numa plataforma.
</p>

<b>Rafael Viana</b> - O sistema exibe as opções de entrega, incluindo prazo e custo.

<b>João Pedro</b> - O cliente pode confirmar o pedido ou cancelá-lo.

<b>Pedro Silvestre</b> - Após confirmado o produto é adicionado a lista de pedidos em andamento, onde as informações referentes a entrega são exibidas como data da entrega final e  localização atual.


---

### 4. Como será a forma de adicionar um restaurante aos favoritos?

<p align = "justify">
<b>Pedro Silvestre</b> - Quando o cliente entrar no perfil de qualquer restaurante, no mesmo haverá um símbolo de uma estrela, ao toca-la ou fazer click caso esteja em computador, a estrela mudara de cor para amarelo que dirá que agora o restaurante estará salvo ao restaurantes favoritos.
</p>

<b>Rafael Vianna</b> - O cliente poderá acessar os seus restaurantes em favoritos tocando no ícone de uma estrela que estará na home da pagina.

<b>João Pedro</b> - O cliente também poderá tirar um restaurantes dos favoritos quando quiser.

---

### 5. Existe a possibilidade de cadastrar mais de um endereço?
<p align = "justify">
<b>Rafael Viana</b>- Na página principal do aplicativo, haverá um ícone de uma engrenagem. Ao selecionar esse ícone, o usuário será redirecionado para outra página, onde encontrará uma área chamada "Endereço". Ao selecionar essa área, o usuário entrará em uma página onde poderá ver o endereço cadastrado, além de ter a opção de remover o endereço ou adicionar um novo.
</p>
<b>João Pedro</b> - O usuário poderá solicitar pedidos simultâneos para até 2 endereços diferentes.

<b>Pedro Silvestre</b> - O usuário terá a possibilidade de registrar um dos endereços como principal.

<b>Rafael Vianna</b> - O usuário também poderá solicitar pedidos diretamente de sua localização atual, sem precisar cadastrar o endereço do local.
</p>
---

### 6. Quais informações seriam interessante para o cliente?
<p align = "justify">
   <b>João Pedro Santana</b> - O usuário poderá acompanhar o seu pedido em tempo real, e terá acesso a todas as informações do pedido, como por exemplo: Uma estimativa de quando vai chegar o pedido, localização de onde está o mesmo e de que forma está sendo entregue o pedido.
</p>
   <b>Pedro Silvestre</b> - Caso houver algum problema com o pedido, o usuário será imediatamente notificado do sucedido e terá as opções de solicitar o envio de um novo pedido, sem ter que pagar novamente ou solicitar um reembolso.

   <b>Rafael Vianna</b> - O cliente terá total liberdade de poder cancelar o seu pedido no momento que ele quiser, independentemente de qualquer outro fator. 


</p>
### Requisitos Funcionais
|ID|Descrição|
|----|-------------|
|BS01| O sistema deve permitir o cadastro de novos usuários com dados pessoais, endereço e forma de pagamento.|
|BS02| O sistema deve permitir que o usuário se cadastre com e-mail/senha ou via login com conta Google.|
|BS03| O sistema deve permitir que o usuário edite seus dados pessoais e endereço a qualquer momento.|
|BS04| O sistema deve permitir que o usuário cadastre múltiplos endereços.|
|BS05| O sistema deve permitir a realização de pedidos com base na localização atual, sem necessidade de cadastro de endereço.|
|BS06| O sistema deve permitir que o usuário realize pedidos simultâneos para até dois endereços diferentes.|
|BS07| O sistema deve permitir a pesquisa de produtos com descrição, imagem e preço.|
|BS08| O sistema deve permitir que o usuário adicione produtos ao carrinho e os remova antes da confirmação do pedido.|
|BS09| O sistema deve exibir os tipos de entrega (delivery rápido ou entrega grande), incluindo prazos e custos.|
|BS10| O sistema deve permitir que o usuário confirme, cancele e acompanhe pedidos em tempo real.|
|BS11| O sistema deve mostrar a localização atual do pedido e uma estimativa de chegada.|
|BS12| O sistema deve exibir informações de status do pedido (ex: “Em preparo”, “A caminho”, “Entregue”).|
|BS13| O sistema deve permitir que o cliente cancele o pedido a qualquer momento.|
|BS14| O sistema deve permitir adicionar e remover restaurantes dos favoritos.|
|BS15| O sistema deve disponibilizar os restaurantes favoritos na tela principal por meio de um ícone específico.|
|BS16| O sistema deve aceitar diferentes formas de pagamento (ex: cartão, Pix, etc.).|
|BS17| O sistema deve processar o pagamento e exibir uma confirmação ao usuário.|
|BS18| O sistema deve exibir o cálculo do frete antes da finalização da compra.|
|BS19| O sistema deve notificar o usuário também em caso de falhas, atrasos ou mudanças no processo de entrega.|


### Requisitos Não Funcionais


|ID|Descrição|
|-----|-------------|
|NBS01| O sistema deve ser responsivo, funcionando bem em smartphones e desktops.|
|NBS02| O sistema deve apresentar uma interface amigável e acessível para usuários com baixa familiaridade digital.|
|NBS03| O sistema deve apresentar tempo de resposta inferior a 2 segundos para carregamento de páginas e ações críticas.|
|NBS04| O sistema deve garantir a segurança dos dados por meio de HTTPS, autenticação segura e criptografia.|
|NBS05| O sistema deve ser escalável para suportar aumento de usuários em horários de pico.|
## Conclusão
<p align = "justify">
Através da aplicação da técnica, foi possível elicitar alguns dos primeiros requisitos do projeto.
</p>
## Referências Bibliográficas

> BARBOSA, S. D. J; DA SILVA, B. S. Interação humano-computador. Elsevier, 2010.


## Autor(es)
| Data | Versão | Descrição | Autor(es) |
| -- | -- | -- | -- |
| 27/03/2025 | 1.3 |  adição 2 e 3 | Pedro Henrique Silvestre, João Pedro Santana e Rafael Viana |
| 27/03/2025 | 1.4 |  adição 4, 5 e 6 | Pedro Henrique Silvestre, João Pedro Santana e Rafael Viana |
