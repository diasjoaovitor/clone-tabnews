# Passo a passo do curso.dev

```
quinta-feira, 28 de março de 2024
```

## Dia 1

### Bem vindo(a)!

Seja muito bem vindo ou bem vinda à primeira aula do /web! 🎉 🤝 👍

Esta primeira aula serve para você:

1. Aquecer os motores
2. Fazer o seu primeiro comentário
3. E coletar os seus primeiros Pontos de Experiência (XP) ao marcar a aula como concluída.

### Como estão organizadas as aulas?

Um dos segredos de uma plataforma educacional de sucesso é a forma como os conteúdos estão organizados porque essa organização pode contribuir ou não com o progresso do aluno, principalmente se sentir estimulado ou desestimulado a concluir as aulas.

E falar sobre isto é muito mais importante do que parece, pois a maioria das pessoas acabam não concluíndo os cursos que se matriculam e vejo que a maioria das plataformas de ensino não ajudam nesta questão.

Então nessas horas, nada melhor do que usar a biologia do corpo humano para contribuir com o ritmo do aluno durante o progresso das aulas 🤝

### Pista Rápida e Pista Lenta

Nesta aula eu trago o conceito de Fast Lane (🚗 Pista Rápida) e Slow Lane (Pista Lenta) e como isso vai ser importante para comportar pessoas em diferentes níveis de habilidade em programação.

E o massa é que isso abre a oportunidade para eu conseguir criar mais conteúdos profundos quando alguém precisar ou algum conteúdo extra para reforço de algum conceito que ainda não ficou claro, sem atrapalhar o avanço macro do projeto e do curso 💪

Como isto é representado dentro da plataforma?
Ótima pergunta e tudo que estiver com o ícone 🚗 é uma Pista Rápida e o restante de todas as outras aulas automaticamente se enquadram na categoria de Pista Lenta.

Então você irá notar que um Dia aqui na plataforma é geralmente representado por uma 🚗 Pista Rápida e várias Pistas Lentas que vem em seguida, conforme a ilustração abaixo sobre o Dia 2:

[Exemplo de Pista Rápida e Pista Lenta](../assets/pista-rapida-e-pista-lenta.png)

## Dia 2

### 🚗 Pista Rápida

Esta é a primeira Pista Rápida (FastTrack) do curso.dev e nela eu dou um rápido resumo dos principais pontos que foram discutidos ao longo das aulas encontradas no Dia 2. Fora isso, eu incentivo pessoas com mais senioridade na área de tecnologia a conferirem as aulas na Pista Lenta, pois nelas serão encontradas analogias que podem ser utilizadas para a pessoa explicar estes conceitos para outras pessoas.

Atenção
Para compartilhar o seu perfil e consultar o perfil de outros alunos, peço que faça isso na aula Git? GitHub? É tudo a mesma coisa?

Você vai encontrar lá muuuuitos perfis legais 💪

### Git? GitHub? É tudo a mesma coisa?

Nesta aula eu trago uma analogia parar esclarecer uma confusão comum entre GitHub e Git, onde apesar de ser uma visão superficial do que é cada uma destas coisas, eu acredito que esta analogia irá servir até para você ensinar para outra pessoa qual a diferença entre estas duas ferramentas.

E nas próximas aulas iremos sair da teoria para visualizar na prática como usar o GitHub e o que é de fato um repositório .git

Site do GitHub: https://github.com/
Site do Git: https://git-scm.com/

### Repositório: onde tudo começa

Tudo começa na criação do repositório (em inglês repository), que é onde você irá guardar os arquivos do seu projeto e o histórico de alteração deles, e nesta aula eu explico todos os detalhes de como fazer isto na interface do GitHub.

E esta é uma aula bastante especial, pois traz estatísticas sobre o TabNews que não estão públicas e também fotos de uma época onde eu trabalhava com Bolsa de Valores, e só assistindo a aula para entender 🤝

### Ambiente de Desenvolvimento

Quanto mais simples for um ambiente de desenvolvimento, maior flexibilidade você terá e, numa visão grosseira, não deveria passar de um lugar para escrever códigos e outro lugar para executar eles ou outros serviços.

🚨 Configurações
Então na lista abaixo você irá encontrar aulas não listadas sobre como configurar um ambiente de desenvolvimento com as dependências mínimas para conseguir escrever e executar o projeto do TabNews:

- Codespaces (recomendado)
- Gitpod (em construção)
- Windows Localhost (em construção)
- macOS Localhost (em construção)
- Linux Localhost (em construção)

### Codespaces

O Codespaces é um ambiente de desenvolvimento completo fornecido de forma gratuita pelo GitHub onde é disponibilizado para você tanto um editor de código, que nesse caso é o super popular VSCode, quanto um terminal que por padrão roda Linux... é tudo o que a gente precisa!

---

```
sexta-feira, 29 de março de 2024
```

## Dia 3

### 🚗 Pista Rápida

Nesta Pista Rápida são tratados assuntos muito importantes para o projeto, como por exemplo: qual versão utilizar do Node.js, Next.js, React e React DOM.

E caso você já saiba instalar as dependências e queira só copiar e colar as versões que apareceram no vídeo, segue abaixo:

nodejs lts/hydrogen
next@13.1.6
react@18.2.0
react-dom@18.2.0

### A fundação

Nesta aula eu destaco uma frase do Carl Sagan que se conecta perfeitamente com o que acontece no mundo da tecnologia e programação... inclusive com o que acontece dentro desta própria aula ao configurar o Node.js, a fundação do projeto, utilizando o utilitário nvm.

### A primeira parede

Com a base feita na aula passada, a gente vai agora começar a levantar as paredes (o que de fato vai dar pra começar a “tocar” do nosso sistema), e o primeiro módulo/framework que a gente vai utilizar pra fazer isso é o Next.js.

Site do framework: https://nextjs.org/
Site da empresa por trás: https://vercel.com/

#### Let's code

```
yarn init -y
git init
```

crie o arquivo `.nvmrc`:

```
lts/hydrogen
```

e execute os comandos: 

```
nvm install
nvm alias default lts/hydrogen
```

```
yarn add next@13.1.6 react@18.2.0 react-dom@18.2.0
```

## Dia 4

### 🚗 Pista Rápida

Eu não podia começar esta Pista Rápida de outra forma, a não ser agradecendo a participação de todos na plataforma e destacando alguns comentários com palavras que me empurram lá pra cima e me dão um gás ainda mais forte pra eu não medir esforços e criar as melhores aulas do mundo. E é injusto a quantidade de comentários que coloquei ali no vídeo em comparação a todos os comentários deixados na plataforma, mas o vídeo ficaria abarrotado de comentários... vocês são apaixonantes 😍 💪 🤝

### Protocolos e rodando o site de forma local

É uma honra ter uma aula como esta aqui na plataforma, pois ela irá fazer você notar a internet de uma forma diferente, pois você vai começar a ver e entender Protocolos, que são a base de toda a comunicação que acontece entre um Cliente e Servidor, desde o seu navegador ao saber se comunicar por HTTP, até a sua rede que sabe se comunicar por TCP através do IP. Além disso, a missão desta aula é levantar o Servidor Web... será que vamos conseguir?

Vídeo do UDP vs TCP: https://youtu.be/ZEEBsq3eQmg

### Página inicial

Depois de uma rápida dica sobre como limpar o seu terminal usando clear ou CTRL + L, chegou a hora de subir de verdade o nosso Servidor Web, mas para isso, precisamos de uma página de verdade e não poderia ser diferente, a não ser começar com a index.

Além disso, eu mostro um recurso interessante no Codespaces sobre como deixar as suas rotas de forma pública e ainda com live-reload.

#### Let's code

crie o arquivo `src/pages/index.js`:

```jsx
export default () => (
  <h1>Home</h1>
)
```

adicione o `script` no arquivo `package.json`:

```json
"scripts": {
  "dev": "next dev"
}
```

execute o comando de inicialização: 

```
yarn dev
```

### Um desafio importante

Turma, nessa aula eu trago um desafio simples, porém muito importante e trata de algo que eu suplicaria para que eu domasse isso no passado ou, pelo menos, que toda a cadeia de gestores e líderes que estivesse acima de mim na hierarquia tivessem domado 🤝

**Atenção** 🛑

Você não precisa executar o desafio aqui agora, inclusive este não é o objetivo desta aula, pois as próximas aulas irão lhe dar o conhecimento técnico para executar isto da melhor forma. Esta aula aqui serviu apenas para inaugurar o desafio e começar a alinhar a sua mente sobre o que importa no final das contas 🤝

**Atenção 2** 🛑

A Vercel implementou um novo sistema de segurança nos deploys chamado de Deployment Protection. Isto é um ótimo recurso, mas caso você queira rapidamente passar a URL de algum deploy específico para alguém, uma alternativa é temporariamente desabilitar esta opção para que o servidor se comporte como antigamente. Para isto, siga estas instruções e desabilite o recurso 🤝

#### Let's code

crie o arquivo `.gitignore`:

```
node_modules
.next
```

e adicione mais um `script` no arquivo `package.json`:

```json
"scripts": {
  [...],
  "start": "next start"
}
```

suba as alterações para o GitHub:

```
git add .
git commit -m "next app"
git push origin main
```

faça o login em https://vercel.com/ e realize o deploy do projeto no GitHub

https://clone-tabnews-diasjoaovitor.vercel.app/

## Dia 5

### 🚗 Pista Rápida

O Dia 5 é um dia mais longo que os outros dias e as Pistas Lentas desse dia são bem densas. Escolhi fazer um Dia assim porque não queria quebrar um raciocínio muito importante que vou explicar apenas aqui nessa Pista Rápida 🤝

Lista de comandos abordados

-`git log` - listar os commits do repositório.
-`git add` - sobe alterações para a staging area.
-`git commit` - realiza novos commits.
-`git commit --amend` - substitui o commit anterior por um novo, mas aproveita as alterações dele.
-`git diff` - calcula a diferença entre as versões/alterações dos arquivos.

Todos estes comandos funcionam de forma offline no Git e podem ser usados sem a necessidade de uma conexão com a internet, pois nenhum deles transmite informações para fora do seu computador.

### Onde fica o "Git"? E como era feito antes disso?

Nesta Pista Lenta nós vamos revisitar a história dos versionadores de código para entender a diferença entre o modelo centralizado e distribuído, e também pincelar como que as pessoas faziam para lidar com versionamento antes de inventarem os controladores de versão. Além disso, mostro como utilizar o Local History, um recurso muito interessante do VSCode, falo sobre Merge Conflict e onde que fica a pasta .git.

### Git Log (e o Jogo dos 7 Erros)

Topa jogar o Jogo dos 7 erros comigo? Tudo em nome de aprender git, mas mais especificamente o mecanismo de diff, pois isto vai ser um "plot twist" numa confusão que muita gente faz sobre os bastidores de como o git funciona e gerencia o seu histórico de arquivos. Fora que, entendendo isso, vai abrir sua mente sobre o que é retornado pelo comando git log (e como).

### Git Commit (e a Escada Infinita)

Agora que a gente já sabe usar o git para ver os commits (as fotos) que o nosso repositório possui, chegou a hora de entender quais são os 3 estágios que um arquivo pode passar nessa história de controle de versão.

### Git Diff e Amend (e a Viagem no Tempo)

Eu gostaria de começar a aula de hoje falando sobre um poder que você tem, que é de viajar no tempo. Sim, você tem em mãos uma máquina do tempo, que não é tão massa quanto um Delorean, mas que é o git e com ele você consegue sim viajar no tempo e mudar as coisas que aconteceram... pelo menos dentro do seu repositório. Então para isto, nós iremos aprender a usar o comando `git commit --amend`.

> **YuriHassle**: Caso você deseje emendar um commit sem alterar a mensagem, é possível passar a flag --no-edit. Com isso, a mensagem anterior será preservada e a tela de edição não será aberta. Ex: git commit --amend --no-edit

> **zamorano**: Para aqueles que precisarem de uma consulta rápida dos comandos mais utilizados do GIT (GIT Cheat Sheet): https://education.github.com/git-cheat-sheet-education.pdf

---

```
sábado, 30 de março de 2024
```

## Dia 6

### 🚗 Pista Rápida

Se você achou o Dia anterior, o Dia 5, massa... o Dia 6 vai ser ainda mais massa! Isso porque a gente vai furar a bolha do repositório local e começar a executar comandos git que influenciam também o repositório remoto, o origin que está lá no GitHub.

Lista de comandos abordados

- `git commit -m "mensagem"` - atalho para fazer novos commits.
- `git push` - empurrar alterações locais para o origin.
- `git push --force` - empurrar de forma forçada alterações locais para o origin.
- `git push -f` - a forma comprimida do comando anterior.

Tirando o comando relacionado aos commits, todos os comandos de push funcionam apenas de forma online e devem ser usados com uma conexão com a internet ativa, pois eles transmitem informações para fora do seu computador (isso assumindo que o seu origin está lá no GitHub).

### Git Push

Nesta Pista Lenta vamos aprender a usar o git push e qual o resultado disto no origin (o repositório de origem). Isto é uma mecânica fundamental para você utilizar no compartilhamento de novas melhorias no repositório, sejam elas novas features, ajustes ou qualquer coisa que empurre a linha do tempo do seu repositório para frente. Falando nisso, nós iremos também ver de forma superficial duas linhas do tempo importantes, a origin/main e local/main.

### Fazendo commits de forma mais rápida

Neste vídeo vamos fazer várias coisas, inclusive nos colocar numa posição problemática porém vida real 🤝

De qualquer forma, o destaque da aula é um atalho para fazer novos commit, um atalho que possivelmente vai se tornar a forma padrão de você fazer eles 💪

### Git Push De Novo (mas agora com ainda mais "força")

Nesta Pista Lenta será ensinado um dos recursos mais perigosos do Git, que é fazer o push, porém usando a opção force. Fora isso, é uma ótima aula para revisar outros comandos como o amend e os efeitos colaterais que ele causa no commit anterior, na linha do tempo da sua branch local e a relação disto tudo com a mesma branch lá no origin.

## Dia 7

### 🚗 Pista Rápida

O Dia 7 começa a separar quem está na área de tecnologia para ser um profissional valorizado e que quer se sentir uma pessoa importante... de quem que tá só de brincadeira.

### Client e Server

Existe uma relação extremamente importante em qualquer camada da tecnologia, que é a relação entre cliente e servidor (ou client e server). Algumas pessoas começam a se confundir sobre quem é o client e quem é o server, pois eles não são papeis fixos e dependem do que exatamente estes componentes estão fazendo. Ter a modelagem correta na mente sobre isso é algo valioso, pois ela destrava novas percepções sobre a arquitetura de todos os softwares envolvidos em um sistema.

### Hospedagem e Deploy

Chegou a hora de hospedar o nosso site e começar a realizar deploys! Então para você ter uma base sólida neste tópico, nós vamos rapidamente passar pela evolução de como as pessoas faziam deploy e serviam sites na internet. Depois, vamos realizar o nosso próprio deploy, tudo isso com a ajuda de um novo integrante da equipe 😍

### Fazendo novos Deploys

Deploy é uma parte crucial de um profissional que trabalha com programação e que quer ver suas implementações e ideias saindo do papel e encostando na realidade. Então nesta aula vamos entender melhor a dinâmica do Continuous Deployment da Vercel, incluindo a funcionalidade das suas URLs permanentes e como tudo isso contribui para você ver os códigos que você programa disponíveis publicamente na internet

Preciso da sua ajuda com o Epilif 🤝
Se você tiver um tempinho extra, por favor, eu peço que você entre na aula não listada abaixo, pois estou precisando de uma ajuda:

- [Resolvendo um problema com Epilif](https://curso.dev/web/epilif-ajustando-frase)

### Resolvendo um problema com Epilif

Que bom que você acessou essa aula não listada, porque eu preciso da sua ajuda pra resolver um problema muito sério com o Epilif, que é dele ter colocado minha frase pra Renata no ar mas no site dele! 😡

### Encerramento do Desafio (Resultados de todo mundo) 🎉

Você chegou no encerramento do Primeiro Desafio 🎉 🎉 🎉

Eu sinceramente estou muito feliz por isso! É algo que vai ser muito importante pra você, pra mim e também pra todos os outros alunos que passarem pela mesma experiência, porque que agora todos nós temos garantidamente algo em comum 🤝

Boas práticas para compartilhar o desafio nos comentários
Ao compartilhar o seu desafio nos comentários desta aula, sugiro seguir os 3 passos abaixo para entendermos melhor o que aconteceu no seu desafio:

1. Escreva um rápido contexto, por exemplo: Quem era a pessoa que você enviou a URL?
2. Dado que a Vercel gera uma URL única do commit no momento de um Deploy, compartilhe conosco este link que é permanente. Por exemplo, o link do meu commit com a frase é este: https://clone-tabnews-6o0vcvooy-filipedeschamps.vercel.app/
3. E por último: Qual foi a reação da pessoa? 😍

**Atenção** 🛑

A Vercel implementou um novo sistema de segurança nos deploys chamado de Deployment Protection. Isto é um ótimo recurso, mas caso você queira rapidamente passar a URL de algum deploy específico para alguém, uma alternativa é temporariamente desabilitar esta opção para que o servidor se comporte como antigamente. Para isto, siga [estas instruções](https://vercel.com/docs/security/deployment-protection#understanding-deployment-protection-by-environment) e desabilite o recurso 🤝

---

```
domingo, 31 de março de 2024
```

## Pitstop 🏁

### Se você puder ajudar, eu agradeço muito 🤝
Muito obrigado por fazer este Pitstop 🤝 🤝 🤝 Este é um momento extremamente importante para o curso.dev, para mim e para minha família 🙏

Sugestões
Caso você queira dar um depoimento, mas não sabe o que abordar, segue abaixo algumas sugestões:

1. Valeu a pena até o momento ter se matriculado?
2. Se você é iniciante, está valendo a pena?
3. Ou se você não é mais iniciante, também está valendo a pena?
4. Se você veio de outra área, está sendo possível dar “conta do recado” e aprender de verdade?
5. O que você está achando da didática? Está dando para aprender mesmo?
6. O que você achou da mecânica da Pista Rápida e Pista Lenta?
7. A plataforma ajuda a ter vontade de fazer as aulas? É algo prazeroso? Faz você se sentir mais próximo do professor?
8. O professor gosta do que faz? Isso se reflete no material e no carinho com os alunos?
9. Você está aprendendo aqui coisas diferentes (ou de formas diferentes) do que em outros cursos?
10. Mesmo que neste estágio do curso, você amadureceu, sente mais coragem ou competência?

**Atenção** 🛑

Tudo que você escrever abaixo ficará público na Home (https://curso.dev/), junto como o seu username. E como está sendo utilizado o exato mesmo sistema de comentários das outras aulas, você poderá interagir com outros depoimentos, seja adicionando novos comentários ou qualificando. Esta é uma área controlada pelos alunos 💪

Eu só irei interferir caso algum depoimento ou comentário venha ferir os Termos de Uso da plataforma, combinado? 🤝

## Dia 8

### 🚗 Pista Rápida

Nos Dias anteriores a gente afiou alguns conhecimentos pra pular algumas barreiras técnicas e também alguns conhecimentos pra pular algumas barreiras iniciais de negócio... e agora chegou a hora da gente afiar diretamente a ferramenta mais importante de todas... o seu cérebro 💪

### Programação "Orgânica" versus "Impressora 3D"

Se segura na cadeira, porque daqui pra frente a gente vai aprender sobre MUITA coisa técnica, muita mesmo, e que vai ser coberto aqui dentro do curso.dev de um jeito que só dá para fazer por aqui 🤝

### Por que meus projetos sempre dão certo?

Falar que "os meus projetos sempre dão certo" é uma afirmação muito forte e eu concordo, mas teve um evento que aconteceu comigo lá no passado (quando eu mexia com Bolsa de Valores) que mudou a minha vida pra sempre.

É um evento que vai se conectar com um módulo Node.js meu ficando na primeira página do site Hacker News e quem conhece esse site sabe o quão difícil é conseguir isso, e que se conecta também com eu receber uma mensagem privada no Twitter de uma pessoa que eu sou muito fã.

## Dia 9

### 🚗 Pista Rápida

Se você quer se divertir programando projetos tanto quanto você se diverte, por exemplo, jogando video games... o Dia 9 existe pra atingir justamente isso 💪

### Qual o “segredo” para organização de tarefas?

Fazer muito com pouco e não pouco com muito... esse é um dos segredos que eu percebi quando o assunto é organização de tarefas.

Vamos mapear como está o mercado?
Se você estiver envolvido em algum projeto (mesmo que pessoal), por favor, utilize a seção de comentários para compartilhar:

1. Quantas pessoas aproximadamente estão envolvidas nesse projeto?
2. Quais softwares estão sendo usados?
3. Quais metodologias estão sendo aplicadas?

> devrodrigo

tenho como exemplo o meu resumo da aula de hoje no notion:

- Fazer muito com pouco e não pouco com muito.
- Quando se planeja muito, em excesso, normalmente, se executa pouco. Quando se planeja pouco, se executa muito, mas com efeitos colaterais como arquitetura ou modelagem ruim.
- É preciso calcular o saldo das coisas que são feitas para determinar se vale a pena ou não continuar dessa forma.
- Dar um passo para trás para dar dois saltos para frente é algo com o saldo positivo.
- Algo fundamental para qualquer controle de tarefas é a possibilidade de se registrar o progresso da tarefa, por meio de checkboxes.
- Nível 1: Ser lembrado individualmente. (Lembrar o que eu preciso fazer)
  - Menor custo de produção (custo de energia para que eu consiga registrar o que precisa ser feito) e menor tempo de aquecimento (Quanto tempo que demora para conseguir ver e conferir o que precisa ser feito).
  - Como, por exemplo, anotações em um papel e sem detalhes, somente com o nome das tarefas, de forma que fique fácil de acessar, ler e lembrar.
- Nível 2: Ser lembrado em grupo. (Lembrar um grupo de pessoas sobre suas tarefas)
  - Quadros de Kanban são ótimos para conseguir criar novas tarefas e relembrar um grupo de pessoas do que precisa ser feito sem levar tempo de aquecimento algum.
- Nível 3: Expandir conhecimento.
  - Conversar e desenvolver de uma forma detalhada o que e como algo deve ser feito.
  - Médio custo de produção e médio tempo de aquecimento.
- Nível 4: Gerar métricas.
  - Conseguir mensurar a produtividade das pessoas que estão trabalhando nas métricas.
  - Alto custo de produção e alto tempo de aquecimento.
  - Pode ser visto como mais cansativo do que a própria tarefa em si, mas é essencial para a gestão do projeto.
  - Muito perigoso quando se olha mais para as barreiras de tecnologia avançadas do que para as barreiras de negócios avançadas.
- JIRA - Visão geral de quantas tarefas são necessárias para finalizar o projeto em relação com quantas foram executadas semanalmente. Permite mostrar que está sendo executado mais tarefas mas que também o número de tarefas necessárias está aumentando de uma forma muito simples.
  - Por exemplo:

  |             | Semana 1 | Semana 2 | Semana 3 |
  |-------------|----------|----------|----------|
  | Total       |   100    |    140   |    150   |
  | Executadas  |   70     |    90    |    115   |
  | Conclusão   |   70%    |    64%   |    77%   |

### Como peitar projetos de qualquer tamanho?

Você gosta de comer pedra? Não responde ainda! 😂 Deixa eu falar algo antes 🤝

Deixa eu te preparar pra que, se você se pegar numa situação em que o seu cérebro está tentando negociar com você um "tudo ou nada", por exemplo: "ou programa o sistema inteiro que você quer fazer nesse final de semana ou não faz nada" é porque ele quer que você faça nada... sabe por que? A resposta está na aula 😍

### Criando a primeira Milestone e Issues do Projeto

Nesta Pista Lenta iremos criar tanto a Milestone 0: Em construção, quanto as 3 Issues abaixo:

- Colocar o site num domínio .com.br
- Definir estilização do código e configurar editor
- Programar página de "Em construção"

Fora conversar sobre a mecânica do neurotransmissor mais importante quando o assunto é se sentir motivado a iniciar, continuar e concluir tarefas.
