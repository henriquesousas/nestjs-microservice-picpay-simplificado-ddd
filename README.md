<!-- ABOUT THE PROJECT -->
## Sobre o projeto
Api para simular uma transação bancária entre duas contas.

### 📂 Objetivo
> Temos 2 tipos de usuários, os comuns e lojistas, ambos têm carteira com dinheiro e realizam transferências entre eles.
Vamos nos atentar somente ao fluxo de transferência entre dois usuários. <br >
Para ambos tipos de usuário, precisamos do Nome Completo, CPF, e-mail e Senha. CPF/CNPJ e e-mails devem ser únicos no sistema. Sendo assim, seu sistema deve permitir apenas um cadastro com o mesmo CPF ou endereço de e-mail.<br >
Usuários podem enviar dinheiro (efetuar transferência) para lojistas e entre usuários.<br >
Lojistas só recebem transferências, não enviam dinheiro para ninguém.<br >
Validar se o usuário tem saldo antes da transferência.<br >
Antes de finalizar a transferência, deve-se consultar um serviço autorizador externo, use este mock para simular (https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc).<br >
A operação de transferência deve ser uma transação (ou seja, revertida em qualquer caso de inconsistência) e o dinheiro deve voltar para a carteira do usuário que envia
No recebimento de pagamento, o usuário ou lojista precisa receber notificação (envio de email, sms) enviada por um serviço de terceiro e eventualmente este serviço pode estar indisponível/instável. Use este mock 
para simular o envio (https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6)


#### 💻 Tecnologias utilizadas
* [![NestJs][NestJs]][NestJs-url]
* [![Typescript][Typescript]][Typescript-url]
* [![Jest][Jest]][Jest-url]
* [![Mysql][Mysql]][Mysql-url]
* [![Docker][Docker]][Docker-url]


<!-- GETTING STARTED -->
##  Getting Started

Siga as instruções abaixo para clonar,executar e propor melhorias neste pequeno projeto que ajuda muito a reforçar alguns conceitos de programação 
para quem esta aprendendo.
Qualquer dúvida entre em contato através do email na guia <b>Contatos</b>

### Requisitos
  1. Necessário ter a variavel de ambiente configurada no projeto (.env)<br />
  2. Na raiz do projeto se tem um .env.example que mostra quais são as KEYs necessárias para configurar corretamente o projeto.<br />
  2. Se preferir rodar o projeto com docker necessário usar na propriedade DB_HOST a configuração abaixo, pois é o nome do container que servirá como host da aplicação. 
   ```js
    DB_HOST=transaction
   ```   

#### ⚙️ Instalação
  ```sh
   # Clone do repositório
    git clone https://github.com/henriquesousas/transaction-payment-desafio-nestjs

   # Instalando NPM packages
    npm install
   ```

<!-- Test-->
#### 🧪 Test
   ```sh
   # roda os teste unitários
   npm run test

   # roda os testes de integracao
   npm run test:e2e

   # roda os testes com coverage
   npm run test:cov
   ```


<!-- Docker-->
#### 🐳 Docker
   ```sh
   # sobe o container
   npm docker compose up

   # interrompe a execução do container
   npm docker compose down
   ```



<!-- CONTRIBUTING -->
## 🤝 Contribuiçao
> As contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será muito apreciada.

> Se você tiver uma sugestão que possa melhorar isso, bifurque o repositório e crie uma solicitação pull. Você também pode simplesmente abrir um problema com a tag “aprimoramento”. Não se esqueça de dar uma estrela ao projeto! Obrigado novamente!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- LICENSE -->
## Licença
Distributed under the MIT License. See `LICENSE.txt` for more information.



<!-- CONTACT -->
## 📧 Contato
Paulo Henrique - paulohenriquess2014@gmail.com

Project Link: [https://github.com/henriquesousas/transaction-payment-desafio-nestjs](https://github.com/henriquesousas/transaction-payment-desafio-nestjs)




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[NestJs-url]: https://nestjs.com/
[NestJs]: https://img.shields.io/badge/-NestJs-ea2845?style=flat-square&logo=nestjs&logoColor=white

[Typescript-url]: https://www.typescriptlang.org/
[Typescript]: https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square

[Jest-url]: https://jestjs.io/pt-BR/
[Jest]: https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white

[Mysql-url]: https://www.mysql.com/
[Mysql]: https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white

[Docker-url]: https://www.docker.com/
[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white

