# Let's code

Esse repositório contém todas as informações para a execução da avaliação.

Caso considere que esteja faltando alguma informação para a execução do exame, abra uma issue no repositório e ela será avaliada.

### Requisitos

A aplicação a ser desenvolvida consite em uma lista de tarefas seguindo o wireframe e funcionalidades abaixo.

![Image of todos](https://github.com/antoniowd/vue-todo/raw/master/wireframe.png)

Deve ser implementado a criação de tarefas utilizando o campo de entrada de texto (de acordo com o wireframe).

Devem ser implementados filtros (de acordo com o wireframe) para as tarefas completadas e tarefas à fazer, e, sem filtro, todas as tarefas.

Ao se clicar no "X" do item da tarefa, a tarefa deve ser removida (sem a necessidade de confirmação).

Deverá ser usado algum framework de frontend (VueMaterial, BootstrapVue, MaterialUI, etc) e devem ser desenvolvidos componentes separados para lista de tarefas e item da lista de tarefa. Pelo menos **um componente** deve possuir teste unitário.

A aplicação deve ser responsiva.

Para simular a API REST, utilize o [json-server](https://github.com/typicode/json-server) passando o arquivo `database.json` como entrada. Todas as informações de instalação e uso da ferramenta estão no repositório da mesma.

### Desafio

Implementar ordenação de tarefas. Deve ser possível definir a ordem das tarefas na lista (não necessariamente usando drag'n drop).

Tarefas completadas devem ficar abaixo das tarefas a serem feitas.

### Avaliação

Você será avaliado pelo código e testes desenvolvidos e por respeitar o guia de estilo de código [Airbnb Style Guide](https://github.com/airbnb/javascript).

Para o desenvolvimento da aplicação e testes devem ser utilizados frameworks (VueMaterial, BootstrapVue, MaterialUI, Jest para testes, etc). Podem ser usados os frameworks que você tem mais experiência.

Separe os commits por passos que foram executados para a execução do projeto em um nível adequado de detalhamento (nem muito nem pouco detalhado).

É esperado que você consiga explicar as decisões que tomou durante o desenvolvimento através de commits.

Obrigatórios:

* ES6
* Teste unitário de pelo menos 1 componente implementado
* [Airbnb Style Guide](https://github.com/airbnb/javascript)
* Mensagens de commits em inglês

### Publicando

Adicione um arquivo HOWTO.md com os procedimentos para inicialização e execução da aplicação e dos testes. Trabalhe sozinho e não compartilhe o projeto na internet.

Faça o fork esse repositório e ao finalizar abra um Pull Request com o resultado e  como as instruções para execução do projeto. Toda a comunicação referente à submissão será feita no próprio Pull Request.

## Boa sorte!