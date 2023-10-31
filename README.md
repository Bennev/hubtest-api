# Clean/Hexagonal Architecture

This is a project for managing users, companies and locations. In this application, a user can own multiple companies and each company can own multiple locations.

## Summary

- [Requirements You Need To Know](#requirements-you-need-to-know)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [References](#references)
  - [Articles](#articles)
  - [Videos](#videos)
  - [Repositories](#repositories)
- [Author](#author)


### Requirements You Need To Know

- Node
- NestJS
- PostGres
- TypeOrm

### Getting Started

To install and run this project locally, follow the steps below:

- Clone the repository to your machine
- Access the folder with your source code editor
- Install dependencies using the command: `npm install`
- Create a Postgres database for this application, you can use the project's docker compose if you want
- Configure the environment variables according to the `.env.example` file
- Run the migrations using the command: `npm run migration:run`
- (Optional) You can run the tests using the command: `npm run test`
- Finally, start the project using the command: `npm run start:dev`

### Documentation

If you want, the documentation will be available via the route: `/doc`

### References

#### Articles

- [Hexagonal architecture](https://alistair.cockburn.us/hexagonal-architecture/)

- [Ports-And-Adapters / Hexagonal Architecture](https://www.dossier-andreas.net/software_architecture/ports_and_adapters.html)

- [Ports And Adapters Architecture](http://wiki.c2.com/?PortsAndAdaptersArchitecture)

- [Ports and Adapters Pattern](https://jmgarridopaz.github.io/content/hexagonalarchitecture.html)

#### Videos

- [45 - Clean Architecture](https://www.youtube.com/watch?v=ONj4zvLtmpA&)

- [112 - Clean Architecture com TypeScript & Node.js | ✨ API COMPLETA ✨](https://www.youtube.com/watch?v=7BNoxRntLYo)

- [Arquitetura Hexagonal na prática. feat. Rodrigo Branas](https://www.youtube.com/watch?v=JufRR4GGkgA)

- [Arquitetura Hexagonal com Nest.js](https://www.youtube.com/watch?v=y4CayhdrSOY)

- [Clean Architecture com Nest.js na prática](https://www.youtube.com/watch?v=ZOyEFaBSEfk)

- [Entenda CLEAN ARCHITECTURE de uma vez por todas! 🧻 | Como DEV ser!](https://www.youtube.com/watch?v=HynTfTli4mw)

#### Repositories

- [domain-driven-hexagon](https://github.com/Sairyss/domain-driven-hexagon)

- [clean-architecture-api-boilerplate](https://github.com/luizomf/clean-architecture-api-boilerplate)

### Author

Matheus Benevides Militão

<div>
  <a href = "mailto:mbenemilitao@gmail.com"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/mbmilitao/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
</div>