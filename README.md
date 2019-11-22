<h1 align="center">Welcome to controle-faltas 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/edusantosbrito" target="_blank">
    <img alt="Twitter: edusantosbrito" src="https://img.shields.io/twitter/follow/edusantosbrito.svg?style=social" />
  </a>
</p>

> Trabalho da matéria de dispositivos móveis utilizando react-native

## Instalar pacotes do projeto

É necessário instalar os pacotes antes de iniciar o projeto:

```sh
npm install
```

## Instalar json-server

```sh
npm install -g json-server
```

Crie um arquivo db.json com o seguinte conteúdo:

```json
{
	"students": [],
	"classrooms": []
}
```

Rode o comando para iniciar a emulação da API:

```sh
json-server --watch db.json
```

A emulação irá executar por padrão na porta 3000

É necessário que você habilite a porta 3000 para o device utilizado para a aplicação (emulador ou dispositivo).

```sh
adb -s <nome-do-device> reverse tcp:3000 tcp:3000
```

## Usage

Para iniciar o projeto execute:

```sh
npm start
```

Irá aparecer um QR Code na tela, para executar com um emulador ou dispositivo, digite **a**

Qualquer dúvida pode mandar mensagem pelo e-mail

edu.santos.brito@gmail.com

## Author

👤 **Eduardo Brito**

-   Twitter: [@edusantosbrito](https://twitter.com/edusantosbrito)
-   Github: [@EduSantosBrito](https://github.com/EduSantosBrito)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
