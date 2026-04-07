# Passo a passo do curso.dev

```sh
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

Crie o projeto `clone-tabnews` no `GitHub` e marque a opção para criar o `README`, depois faça o clone do projeto

Entre na pasta `clone-tabnews` e crie o arquivo `.nvmrc`:

```sh
lts/hydrogen
```

execute os comandos:

```sh
nvm install
nvm alias default lts/hydrogen
```

```sh
npm i next@13.1.6 react@18.2.0 react-dom@18.2.0
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

Crie o arquivo `src/pages/index.js`:

```jsx
export default () => <h1>Home</h1>
```

adicione o `script` no arquivo `package.json`:

```json
{
  "scripts": {
    "dev": "next dev"
  }
}
```

execute o comando de inicialização:

```sh
npm run dev
```

### Um desafio importante

Turma, nessa aula eu trago um desafio simples, porém muito importante e trata de algo que eu suplicaria para que eu domasse isso no passado ou, pelo menos, que toda a cadeia de gestores e líderes que estivesse acima de mim na hierarquia tivessem domado 🤝

**Atenção** 🛑

Você não precisa executar o desafio aqui agora, inclusive este não é o objetivo desta aula, pois as próximas aulas irão lhe dar o conhecimento técnico para executar isto da melhor forma. Esta aula aqui serviu apenas para inaugurar o desafio e começar a alinhar a sua mente sobre o que importa no final das contas 🤝

**Atenção 2** 🛑

A Vercel implementou um novo sistema de segurança nos deploys chamado de Deployment Protection. Isto é um ótimo recurso, mas caso você queira rapidamente passar a URL de algum deploy específico para alguém, uma alternativa é temporariamente desabilitar esta opção para que o servidor se comporte como antigamente. Para isto, siga estas instruções e desabilite o recurso 🤝

#### Let's code

Crie o arquivo `.gitignore`:

```sh
node_modules
.next
```

e adicione mais um `script` no arquivo `package.json`:

```json
{
  "scripts": {
    "start": "next start"
  }
}
```

suba as alterações para o GitHub:

```sh
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

- `git log`: listar os commits do repositório.
- `git add`: sobe alterações para a staging area.
- `git commit`: realiza novos commits.
- `git commit --amend`: substitui o commit anterior por um novo, mas aproveita as alterações dele.
- `git diff`: calcula a diferença entre as versões/alterações dos arquivos.

Todos estes comandos funcionam de forma offline no Git e podem ser usados sem a necessidade de uma conexão com a internet, pois nenhum deles transmite informações para fora do seu computador.

### Onde fica o "Git"? E como era feito antes disso?

Nesta Pista Lenta nós vamos revisitar a história dos versionadores de código para entender a diferença entre o modelo centralizado e distribuído, e também pincelar como que as pessoas faziam para lidar com versionamento antes de inventarem os controladores de versão. Além disso, mostro como utilizar o Local History, um recurso muito interessante do VSCode, falo sobre Merge Conflict e onde que fica a pasta .git.

### Git Log (e o Jogo dos 7 Erros)

Topa jogar o Jogo dos 7 erros comigo? Tudo em nome de aprender git, mas mais especificamente o mecanismo de diff, pois isto vai ser um "plot twist" numa confusão que muita gente faz sobre os bastidores de como o git funciona e gerencia o seu histórico de arquivos. Fora que, entendendo isso, vai abrir sua mente sobre o que é retornado pelo comando git log (e como).

### Git Commit (e a Escada Infinita)

Agora que a gente já sabe usar o git para ver os commits (as fotos) que o nosso repositório possui, chegou a hora de entender quais são os 3 estágios que um arquivo pode passar nessa história de controle de versão.

### Git Diff e Amend (e a Viagem no Tempo)

Eu gostaria de começar a aula de hoje falando sobre um poder que você tem, que é de viajar no tempo. Sim, você tem em mãos uma máquina do tempo, que não é tão massa quanto um Delorean, mas que é o git e com ele você consegue sim viajar no tempo e mudar as coisas que aconteceram... pelo menos dentro do seu repositório. Então para isto, nós iremos aprender a usar o comando `git commit --amend`.

> **YuriHassle**

Caso você deseje emendar um commit sem alterar a mensagem, é possível passar a flag --no-edit. Com isso, a mensagem anterior será preservada e a tela de edição não será aberta. Ex: git commit --amend --no-edit

---

> **zamorano**

Para aqueles que precisarem de uma consulta rápida dos comandos mais utilizados do GIT (GIT Cheat Sheet): https://education.github.com/git-cheat-sheet-education.pdf

## Dia 6

### 🚗 Pista Rápida

Se você achou o Dia anterior, o Dia 5, massa... o Dia 6 vai ser ainda mais massa! Isso porque a gente vai furar a bolha do repositório local e começar a executar comandos git que influenciam também o repositório remoto, o origin que está lá no GitHub.

Lista de comandos abordados

- `git commit -m "mensagem"`: atalho para fazer novos commits.
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

> **devrodrigo**

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

  |            | Semana 1 | Semana 2 | Semana 3 |
  | ---------- | -------- | -------- | -------- |
  | Total      | 100      | 140      | 150      |
  | Executadas | 70       | 90       | 115      |
  | Conclusão  | 70%      | 64%      | 77%      |

---

### Como peitar projetos de qualquer tamanho?

Você gosta de comer pedra? Não responde ainda! 😂 Deixa eu falar algo antes 🤝

Deixa eu te preparar pra que, se você se pegar numa situação em que o seu cérebro está tentando negociar com você um "tudo ou nada", por exemplo: "ou programa o sistema inteiro que você quer fazer nesse final de semana ou não faz nada" é porque ele quer que você faça nada... sabe por que? A resposta está na aula 😍

### Criando a primeira Milestone e Issues do Projeto

Nesta Pista Lenta iremos criar tanto a Milestone 0: Em construção, quanto as 3 Issues abaixo:

- Colocar o site num domínio .com.br
- Definir estilização do código e configurar editor
- Programar página de "Em construção"

Fora conversar sobre a mecânica do neurotransmissor mais importante quando o assunto é se sentir motivado a iniciar, continuar e concluir tarefas.

## Dia 10

### 🚗 Pista Rápida

Não sei se você notou, mas a gente está passando um pente fino em tudo e no Dia 10 não vai ser diferente. Eu digo isso porque eu já conversei com muitos desenvolvedores seniores que eram “seniores ocos”... e eu não estou querendo machucar ninguém falando isso. Primeiro porque é algo muito comum, muito mais comum do que muita gente que ainda não é sênior possa imaginar que seja assim, e segundo e mais importante, nas conversas que eu tive, a própria pessoa revelava isso (de ter essa insegurança) e isso foi um dos grandes motivos de eu colocar na mensagem principal do curso.dev…que "se sentir competente em programação começa aqui".

Então pra isso acontecer, pra de verdade se sentir completamente competente, não tem pra onde escapar... é preciso trabalhar o lado pessoal/profissional e o lado técnico e o Dia 10 junta essas duas coisas 💪

### Uma história macabra sobre "Estilização de Código"

No compromisso de fazer o download do meu cérebro, eu não posso apenas ensinar a parte técnica de algo que eu acredito ser importante. Eu preciso compartilhar com você eventos da "vida real" que aconteceram e que, aí sim, concretizam a importância da parte técnica. Isso é o que irá fazer grudar na sua mente o conhecimento 💪

Então nesta aula vou contar uma história que eu vivenciei no início do Pagar.me, onde eu espero convencer você que, estilização de código, no longo prazo, é algo muito importante 🤝

**Curiosidade**

[Neste comentário](https://curso.dev/alunos/czaghi/e5632290-0281-41ae-b7f0-a762bdc9ff09) o aluno czaghi diz que encontrou o PR que eu citei na aula 😂

### Sincronização das configurações do Editor

Esta é uma aula mais específica ao Codespaces ou até VS Code e que serve como referência para outros editores sobre uma feature para sincronização na nuvem de configurações.

Mas independente disto, a parte mais importante é que nesta aula iremos aprender a dividir uma Issue em Tarefas e concluir a primeira Tarefa da Milestone 🎉

### Configurar o EditorConfig

O EditorConfig é um Configurador de Editor e por ele a gente vai definir regras fundamentais de como o seu Editor deve se comportar como, por exemplo, qual a largura da indentação do código, se será uma indentação mais curta ou mais comprida e se nela deve usar o caractere de espaço ou tab. Mas importante destacar que essas regras irão acontecer antes de você salvar um arquivo... guarde esta informação para a próxima aula 🤝

#### Let's code

Crie o arquivo `.editorconfig` e instale [sua extensão](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

```yml
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

O arquivo `.editorconfig` é utilizado para padronizar as configurações de formatação do código-fonte em diferentes editores e IDEs. Vamos analisar cada comando:

- `root = true`: Indica que o arquivo `.editorconfig` é o arquivo raiz, aplicando-se a todo o projeto.
- `[*]`: Padrão global que se aplica a todos os arquivos.
- `indent_style = space`: Define o estilo de recuo como espaços.
- `indent_size = 2`: Tamanho da indentação (2 espaços).
- `end_of_line = lf`: Caractere de fim de linha (LF - Line Feed).
- `charset = utf-8`: Conjunto de caracteres UTF-8.
- `trim_trailing_whitespace = true`: Remove espaços em branco no final das linhas.
- `insert_final_newline = true`: Adiciona uma nova linha vazia ao final do arquivo, se ainda não existir.

O uso do `.editorconfig` ajuda a manter a consistência na formatação do código, mesmo quando diferentes desenvolvedores utilizam editores diferentes. 😊

### Configurar o Prettier

Nesta aula iremos passar um pente fino no assunto Prettier que é um dos formatadores de código mais famosos do mundo 💪

A princípio, o assunto Prettier é simples, e de fato é, mas esta simplicidade abre espaço para brechas numa estratégia mais madura sobre a garantia da estilização do código. Então como aqui no curso.dev minha missão é não deixar buracos no seu conhecimento, chegou a hora de estudar este assunto de forma séria, incluindo, preparar o projeto para que ele também seja um projeto sério 🤝

#### Let's code

Instale o [módulo](https://www.npmjs.com/package/prettier) e a [extensão](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) do [prettier](https://prettier.io/)

```sh
npm i -D prettier
```

defina o `prettier` como o formatador padrão do `VSCode` em `Default Formatter` e habilite a opção `Format On Save`. Para garantir a melhor praticidade quando estiver escrevendo testes automatizados, desabilite a opção `Auto Save`

Você também pode definir essas configurações criando o arquivo `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.autoSave": "off",
  "git.autofetch": true
}
```

E definir algumas configurações no arquivo `.prettierrc.json`:

```json
{
  "trailingComma": "none",
  "semi": false,
  "singleQuote": true
}
```

- **"trailingComma": "none"**: Indica que o Prettier não adicionará vírgulas finais. Exemplo sem essa opção: `[1, 2, 3,]`. Com essa opção: `[1, 2, 3]`.

- **"semi": false**: Desativa a inserção automática de ponto e vírgula. Exemplo sem essa opção: `const name = 'Copilot';`. Com essa opção: `const name = 'Copilot'`.

- **"singleQuote": true**: Faz com que o Prettier use aspas simples. Exemplo sem essa opção: `const greeting = "olá"`. Com essa opção: `const greeting = 'olá'`.

Finalmente, adicione os `scripts`:

```json
{
  "scripts": {
    "dev": "next dev",
    "lint:check": "prettier --check .",
    "lint:fix": "prettier --write ."
  }
}
```

### 🎁 Extra: Configurar o Prettier Ignore

Algo aconteceu no meu ambiente de desenvolvimento que foi diferente do que aconteceu no ambiente de alguns outros alunos quando executaram o script npm run lint:check ou npm run lint:fix. Nesta aula vamos investigar o que aconteceu e o que fazer para deixar tudo sincronizado 💪

🛑 **Breaking Change**

O prettier a partir da versão 3.0.0 mudou o seu comportamento e por padrão está utilizando o conteúdo dentro .gitignore para também ignorar o linting de estilização 🎉 Isto foi anunciado neste comunicado.

Caso você queira simular o comportamento da aula, basta instalar o módulo na versão 2.8.8 da seguinte forma:

```sh
npm install prettier@2.8.8
```

## Dia 11

### 🚗 Pista Rápida

O Dia 11 ficou reservado para falar sobre DNS e a maravilha que é esse negócio que inventaram e nesta Pista Rápida nós iremos revisar tudo o que aconteceu nas Pistas Lentas, com um adicional sobre ataques DDoS que tentaram derrubar a resolução global de DNS 💪

### Resolução de DNS (Desafio Nível 1)

No momento que você entender de verdade o que é DNS, você vai domar a principal porta de entrada pro seu site ou serviço, você vai reagir com frieza quando precisar mover a instalação da sua aplicação de um servidor para o outro ou pra quando quando precisar colocar um Cloudflare na frente para aguentar ataques de negação (DoS e DDoS) que estão tentando derrubar o seu sistema.

Fora que você vai conseguir adicionar certas informações dentro do seu domínio que vão certificar que você é dono dele e que vão até aumentar a taxa de entrega dos emails que a sua aplicação envia, por exemplo, emails de ativação de cadastro ou recuperação de senha, onde se você errar nisso, alguns provedores vão recusar por completo os emails enviados pela sua aplicação... então o assunto é sério.

E para ensinar DNS de um jeito diferente, optei por dividir o conhecimento em um Desafio de 2 Níveis, onde este é o primeiro nível 💪

> **ViniciusPimenta**

- `Root Server (Servidor Raiz)`: Os servidores raiz são um conjunto de servidores DNS essenciais que estão localizados no topo da hierarquia do sistema de nomes de domínio. Eles são responsáveis por responder às consultas DNS de alto nível, como "onde está o servidor para o domínio .com?" ou "onde está o servidor para o domínio .br?". Embora haja várias instâncias de servidores raiz físicos, eles são representados por um pequeno número de endereços IP, conhecidos como os "endereços IP dos servidores raiz". Esses servidores raiz não resolvem consultas DNS completas, mas encaminham as consultas para os próximos níveis da hierarquia.

- `TLD (Top-Level Domain - Domínio de Primeiro Nível)`: Os TLDs são os segmentos finais dos nomes de domínio, como .com, .org, .net, .br, .edu, etc. Cada TLD é administrado por uma organização ou entidade específica, conhecida como Registro de TLD. Os servidores de nomes autoritativos para um TLD são responsáveis por manter as informações sobre os domínios registrados sob esse TLD. Por exemplo, os servidores de nomes autoritativos para o TLD .com sabem onde encontrar informações sobre os domínios como exemplo.com, empresa.com, etc.

- `Authoritative Server (Servidor Autoritativo)`: Esses servidores contêm informações específicas sobre os domínios. Eles respondem a consultas DNS com informações precisas e atualizadas para os domínios que gerenciam. Por exemplo, se alguém faz uma consulta sobre um nome de domínio específico (por exemplo, www.exemplo.com), o servidor autoritativo para o domínio exemplo.com fornecerá a resposta correta, como o endereço IP associado a esse domínio.

- `Recursive Resolver (Resolvedor Recursivo - Provedor de Internet)`: Esses são os servidores DNS operados por provedores de internet (ISPs) ou outros provedores de serviços. Quando você faz uma consulta DNS, como digitar um nome de domínio no seu navegador, o resolvedor recursivo é responsável por encontrar a resposta correta. Ele começa perguntando aos servidores raiz sobre a localização dos servidores de nomes autoritativos para o TLD correspondente. Em seguida, consulta os servidores de nomes autoritativos para obter as informações específicas do domínio. Uma vez obtida a resposta, o resolvedor recursivo a armazena em cache para consultas futuras, reduzindo a latência.

Em resumo, os servidores raiz são o ponto de partida para consultas DNS, os TLDs representam as diferentes categorias de domínios, os servidores autoritativos têm informações específicas de domínio e os resolvedores recursivos são responsáveis por encontrar e armazenar em cache as informações de domínio para os usuários.

---

### Você conseguiu encontrar o link secreto!

[Abra o Baú Para o Próximo Desafio!](https://curso.dev/web/resolucao-dns-nivel-3)

### Resolução de DNS (Desafio Nível 2)

Nesta aula iremos passar por toda cadeia de resolução de um DNS e entender de fato como que através de um domínio é possível descobrir o IP do servidor 💪

> **augustoresende**

Pra quem quiser aprofundar no assunto recomendo esse vídeo do Ayub onde mostra que a noção de "propagação de DNS" na realidade não existe e que tudo é TTL, e como ele funciona a fundo: https://www.youtube.com/watch?v=mJg47WRfrBw

---

## Dia 12

### 🚗 Pista Rápida

Se o Dia 11 ficou reservado para falar da parte teórica do DNS, o Dia 12 ficou reservado para a parte prática e dentro deste vídeo vamos revisar tudo o que aconteceu e, ao final, eu falo sobre uma característica que os melhores profissionais com que eu já trabalhei compartilhavam 💪

### Registrar um Domínio Próprio

Quando você faz um registro de um domínio .com.br (ou o registro de qualquer domínio na verdade), você está modificando a internet e é isto que iremos fazer nesta aula 💪

🛑 **Atenção**

Caso ao registrar o domínio você receba uma mensagem de erro informando algo como "outro serviço está como responsável pela administração", peço que leia as instruções colocadas neste [comentário do niege](https://curso.dev/alunos/niege/2cfc6796-1d2a-4895-8b3f-ca829f41563b) e que dá os passos sobre como desbloquear o atual Registrador 🤝

### Configurar o Servidor de DNS

Nesta Pista Lenta iremos configurar nosso próprio Servidor Autoritativo (Servidor de DNS), para que ele aponte lá para o Servidor da Vercel, que é onde ta o nosso site 💪

**Chorinho sobre Servidor de DNS**

[Clique aqui](https://curso.dev/web/configurar-servidor-dns-chorinho) para acessar a aula 🤝

Registro.br possui um "Modo Avançado"
Eu não sabia, mas o Rodrigo Kulb colocou [nesta resposta](https://curso.dev/alunos/niege/2cfc6796-1d2a-4895-8b3f-ca829f41563b) que o Registro.br possui um Modo Avançado onde ele fornece para você um Servidor Autoritativo completo 😍

### "Chorinho" sobre Servidor de DNS 💪

Que massa que você decidiu assistir o chorinho de conteúdo sobre o Servidor de DNS porque com ele há uma alta probabilidade de isso te colocar na frente daquele seniorzão do trabalho ou estar melhor preparado pra uma discussão na internet quando o assunto é DNS 💪

E não perde a oportunidade de ficar até ao final para o desafio de Capture The Flag 🤝

#### Let's code

Instale ferramentas de `DNS`

```sh
sudo apt install dnsutils
```

Exemplo:

```sh
dig fintab.com.br

;; ANSWER SECTION:
fintab.com.br.          0       IN      A       76.76.21.142
fintab.com.br.          0       IN      A       76.76.21.9
```

```sh
dig fintab.com.br TXT

;; ANSWER SECTION:
fintab.com.br.          0       IN      TXT     "Sou apaixonado pelos alunos do curso.dev"
```

```sh
dig fintab.com.br TXT +trace

; <<>> DiG 9.16.1-Ubuntu <<>> fintab.com.br TXT +trace
;; global options: +cmd
.                       0       IN      NS      a.root-servers.net.
.                       0       IN      NS      b.root-servers.net.
.                       0       IN      NS      c.root-servers.net.
.                       0       IN      NS      d.root-servers.net.
.                       0       IN      NS      e.root-servers.net.
.                       0       IN      NS      f.root-servers.net.
.                       0       IN      NS      g.root-servers.net.
.                       0       IN      NS      h.root-servers.net.
.                       0       IN      NS      i.root-servers.net.
.                       0       IN      NS      j.root-servers.net.
.                       0       IN      NS      k.root-servers.net.
.                       0       IN      NS      l.root-servers.net.
.                       0       IN      NS      m.root-servers.net.
;; Received 432 bytes from 172.29.240.1#53(172.29.240.1) in 0 ms

br.                     172800  IN      NS      a.dns.br.
br.                     172800  IN      NS      b.dns.br.
br.                     172800  IN      NS      c.dns.br.
br.                     172800  IN      NS      d.dns.br.
br.                     172800  IN      NS      e.dns.br.
br.                     172800  IN      NS      f.dns.br.
br.                     86400   IN      DS      38298 13 2 9F2D4993F47B0F2751DE0007D70A2754EE532FE373761154D9EA7A8C B9D8EA18
br.                     86400   IN      RRSIG   DS 8 1 86400 20240417190000 20240404180000 5613 . HMQfRu1BxWDQUtw2/ZTFKrOEbDTuH/JyUNHBavJ1syea2Vz6VJiz8iwX Bhbsw+uyXgTfkDjFpgYXqysDmXCbRmDsaij90TUsTGlyQ+zTh3EEV8+z rNhW+aCE1HR3iWHBMSwVZxVNRKUAwP7JDNyh1WZBw/UlUjFtJg8wrYuE ht0BkNE9HCSVRnZLEZI9SK9+FvKCgcH7y6y58SJ7FJNegEZSYM8zZ1O8 fREa7Pe8SFPODmfscl/7GlWKxDKnK2ZiZKk2KRaXjkYlWKNXaMTm900k yyelPJFRZjCZbnPBy2sI/w3uXSIuTH/sbFbvxeIrX6O9jRHABO4j1Vow y4H6bw==
;; Received 741 bytes from 199.7.91.13#53(d.root-servers.net) in 149 ms

fintab.com.br.          3600    IN      NS      ns1.vercel-dns.com.
fintab.com.br.          3600    IN      NS      ns2.vercel-dns.com.
ve8nh0hp4ithvld6q1usbiuo0f09ia67.com.br. 900 IN NSEC3 1 1 0 ECDCFACEFB1D98A53E0B VE8NNBTS3UKVO5V9J4VAF6NF8Q2S8IT4 NS SOA RRSIG DNSKEY NSEC3PARAM
ve8nh0hp4ithvld6q1usbiuo0f09ia67.com.br. 900 IN RRSIG NSEC3 13 3 900 20240419003508 20240404233508 57034 com.br. JODKAXt8fekFVTNScU1B09APnn1PGQ929rba58u6UmXuFtzY8NYXcAEU FaSWieGysoTIhjqZl6SAPWIVv2zysQ==
3at2plohqp8paoe4umtmbk3bu10t4d15.com.br. 900 IN NSEC3 1 1 0 ECDCFACEFB1D98A53E0B 3AT55RB38OM7ELJ4LKPLAJ6OB9QM43D2 NS DS RRSIG
3at2plohqp8paoe4umtmbk3bu10t4d15.com.br. 900 IN RRSIG NSEC3 13 3 900 20240416205608 20240402195608 57034 com.br. e4y+xbhaR2OmzreZHj3WkOqLudAjHyjSEUv/F5Hqkp8BABbqnYTByndW MLC6TIeR+MmwCCRRAZHIWginU68oLw==
;; Received 503 bytes from 200.189.41.10#53(b.dns.br) in 69 ms

fintab.com.br.          60      IN      TXT     "Sou apaixonado pelos alunos do curso.dev"
;; Received 95 bytes from 198.51.44.13#53(ns1.vercel-dns.com) in 39 ms
```

#### Desafio

```sh
dig curso.dev TXT

;; ANSWER SECTION:
curso.dev.              0       IN      TXT     "HA! Voce me encontrou, mas o desafio ainda nao terminou, a bandeira esta aqui: aHR0cHM6Ly9jdXJzby5kZXYvd2ViL2Rucy1oNGNrM3I="
curso.dev.              0       IN      TXT     "v=spf1 include:_spf.google.com ~all"
```

**Eu**:

pode converter o subdomínio em base64 "aHR0cHM6Ly9jdXJzby5kZXYvd2ViL2Rucy1oNGNrM3I="

**Copilot**:

Claro! O texto em base64 que você forneceu é: "aHR0cHM6Ly9jdXJzby5kZXYvd2ViL2Rucy1oNGNrM3I=".
Vamos decodificá-lo para obter o URL original. Utilizando uma ferramenta de decodificação de base64, obtemos:

- Acesse [esta ferramenta de decodificação de base64](https://www.base64encode.org/).
- Cole o texto base64 na caixa de entrada.
- Clique no botão "Decode".
  O resultado é o seguinte URL: https://curso.dev/web/dns-h4ck3r

### 🏳️ Capture The Flag: DNS

Você conseguiu encontrar a bandeira de DNS! 🎉 🎉 🎉 Parabéns por ter concluído o primeiro Capture The Flag do curso.dev! 💪 😍 🤝

## Dia 13

### 🚗 Pista Rápida

Diferente da Pista Rápida do Dia 12 que foi bem longa, esta Pista Rápida aqui vai ser bem curta e rápida mesmo, não porque não tem conhecimentos importantes nas duas Pistas Lentas do dia, porque tem sim, mas é aquele tipo de conhecimento especial que revive acontecimentos da vida real de quem trabalha com tecnologia e que só vai fazer sentido acompanhar pela Pista Lenta mesmo... mas vou resumir o que aconteceu 🤝

### Página "Em Construção" e Encerramento da Milestone 0

Chegamos no ponto de começar a expandir o nosso alcance e começar a encontrar mais pessoas para criar um impacto e ter uma reação delas. Como se a gente fosse um radar e começasse a aumentar a potência dele, aumentar a potência do que você acredita que deva ser melhorado no mundo, aqueles 0.0000000000001% e aí você vai ver que mais pontinhos vão começar a aparecer no radar 💪

Em paralelo a isto, eu apresento a Ideia McDonalds e mostro como eu usei ela para destravar o desenvolvimento de times em situações da vida real e também para conseguir destravar as minhas próprias ideias 🤝

**Museu TabNews**

- Página do Museu: https://www.tabnews.com.br/museu
- Página "Em Construção": https://www.tabnews.com.br/museu/construction-01.html

### Não confie em nenhum serviço 🛑

Quando eu falo para não confiar nos serviços eu não estou falando no sentido moral em que eles "querem o seu mal" ou "querem fraudar você" de alguma forma. Até porque, todos os serviços que eu uso (seja em projetos pessoais ou projetos profissionais) eu confio bastante neste ponto... e é o mínimo na verdade.

Agora, uma coisa que você não pode confiar e que não existe, é 100% de Uptime, ou seja, um serviço consiga dentro de um ano ficar online 100% do tempo nos mais de 31 milhões de segundos que um ano tem.

**Status Pages**

- Vercel: https://www.vercel-status.com/
- AWS: https://health.aws.amazon.com/health/status
- GitHub: https://www.githubstatus.com/

## Dia 14

### 🚗 Pista Rápida

O Dia 14 veio para inaugurar a Milestone 1: Fundação que é um grande marco para o projeto e que vai fazer você entender como subir um projeto que pára em pé, de forma organizada e, mais importante, sem endoidar e sem desistir no meio do caminho 💪

**Aula não listada extra**:

🎁 Bônus: [PoC e MVP ajudam mesmo?](https://curso.dev/web/poc-e-mvp)

### 🎁 Bônus: PoC e MVP ajudam mesmo?

Que massa que você acessou a aula bônus e nela vamos conversar sobre uma confusão relacionada aos termos PoC e MVP 🤝

### Inauguração Milestone 1: Fundação

Se você ficou feliz com os conhecimentos adquiridos até a conclusão da Milestone 0, você vai gostar muito mais dos conhecimentos que vai adquirir agora na Milestone 1: Fundação.

O nível de segurança e liberdade que você vai sentir ao concluir ela é de um valor impagável! Chega de ter ideias que ficam paradas na gaveta, pois você vai ver uma oportunidade no mundo e vai ter capacidade de capturar ela 💪

### Uma história macabra sobre "Overengineering"

Esta é mais uma aula que vai trazer experiência da vida real e que eu tento passar um pouco da minha "imunidade tecnológica" para você no que trata de algo que pode matar o seu projeto, o temido e confuso Overengineering.

Proposta de Arquitetura e Pastas
Chegou a hora de defirmos duas coisas importantes para o projeto:

### Arquitetura de Software

Organização de Pastas e Arquivos
Então neste vídeo eu conto como foi o processo de decidir isso e outras coisas quando o TabNews nem existia ainda 🤝

**Link da issue original**

Este é o link da issue lá do repositório do TabNews:
https://github.com/filipedeschamps/tabnews.com.br/issues/12

> **eukaio**

Quem quiser inserir os emojis de pastas 📂 e arquivos 📃 no texto da Issue basta ir em https://emojipedia.org/ e copiar.

Já os caminhos das pastas foram desenhados com caracteres especiais para desenho de linha ┣ ┃ ┗. Você encontra uma lista aqui https://en.wikipedia.org/wiki/Box-drawing_character

Edit: Para usuários de Windows existe o atalho tecla windows + tecla ponto (win + .) que abre uma lista de emojis.

---

## Dia 15

### 🚗 Pista Rápida

Eu não to brincando quando eu falo que o Dia 15 pode mudar de verdade a sua vida na programação, isso porque ela ficou reservada para falar sobre Testes Automatizados e que é um tema que, se você engata, se você entende os benefícios e usa pra programar de uma forma melhor e mais despreocupada, muda completamente o seu fluxo de trabalho e é um caminho sem volta... sem volta mesmo!

### Testes Automatizados: um caminho sem volta

Trabalhar com Testes Automatizados para acelerar e melhorar como você programa é um caminho sem volta. O problema é como passar um conteúdo infinito como este num estilo "curso.dev" e neste vídeo eu faço uma proposta 🤝

### Instalar um Test Runner

Se você ainda não passou pela jornada dos Testes Automatizados, com o que eu vou te mostrar daqui para frente, provavelmente você vai pensar "nossa... testes automatizados é só isso!?!" ... aí naturalmente você vai enfiando cada vez mais o pé na lama, talvez num ponto de começar a colocar o assunto Testes Automatizados num pedestal. Aí depois quando dá aquele click de novo sobre o que realmente está acontecendo... você vai voltar a pensar: "nossa… testes automatizados… é só isso?!??!?"

É uma jornada muito legal e reveladora de vários aspectos sobre a "arte de programar", e tudo começa com a instalação de um Test Runner 💪

#### Let's code

Instale o _test runner_ `jest`:

```sh
npm i -D jest@29.6.2
```

adicione os scripts de teste:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

### Criar um "Teste de Teste"

Eu e você temos uma missão importante dentro dessa aula que é completar a tarefa de Criar um Teste de Teste, fora começar a aprender sobre o fluxo de trabalho que eu uso, que é usar o Test Runner para que ele nos diga se estamos nos aproximando ou afastando de um certo objetivo. E se você estiver se perguntando: "mas tá... qual objetivo?" Ótimo, porque é exatamente aqui que você precisa ativar o seu Modo Arqueiro e todo arqueiro precisa de um alvo (de um objetivo) para atirar a sua flecha 🏹

Introdução ao JavaScript
Meu objetivo é construir um material para pessoas que estão iniciando realmente do zero, mas enquanto este material não existe, gostaria de recomendar a playlist abaixo:

🎥 [Curso Grátis de JavaScript e ECMAScript para Iniciantes](https://www.youtube.com/playlist?list=PLHz_AreHm4dlsK3Nr9GVvXCbpQyHQl1o1)

### Criar um "Teste de Verdade"

Agora a coisa começa a ficar séria porque a gente vai criar um Teste de Verdade e encerrar a issue Testes Automatizados pra valer 💪 Fora isso, nós vamos treinar duas abordagens completamente opostas quando se escreve testes (onde uma é só para profissionais) 🤝

## Dia 16

### 🚗 Pista Rápida

O Dia 16 é mais um daqueles dias especiais aqui no curso.dev porque mistura parte teórica, parte prática e também como ser um profissional melhor. E eu diria que esta última parte de ser um profissional melhor é o que faz grudar na sua mente a parte teórica e prática, tanto que no final dessa Pista Rápida aqui eu adicionei uma mensagem extra que eu não coloquei em nenhuma Pista Lenta 💪

### A maior briga no universo dos Testes Automatizados

Testes Automatizados é um assunto tão importante quanto ele é passível de gerar briga na internet e nessa aula eu vou mostrar o motivo. É muito importante você estar preparado para esse tipo de discussão, principalmente sobre a diferença entre testes unitários, integração e e2e 💪

**Pergunta**

Qual a sua definição sobre os tipos de teste que existem?

### Encostando a mão no Protocolo HTTP 🔥

Essa aula vai ser muito massa, porque eu e você vamos encostar a mão no protocolo HTTP e isso não somente vai esclarecer na sua mente muita coisa sobre tudo o que existe na internet, como também vai ser a base para conseguir entender de fato (ou revisitar) muita coisa importante como: cookies, cabeçalhos, status codes, mas tirando toda a magia de onde esses dados vem, e tudo isso vai colocar você um passo mais próximo da senioridade, ou pelo menos, vai fazer você conseguir ter conversas sérias, muito mais avançadas e certeiras quando o contexto pedir por uma pessoa que tenha maturidade e experiência nesse assunto.

### Não é magia! (é Protocolo)

Eu sugiro você ter um único objetivo com estas aulas mais recentes, que é acreditar que, na area de tecnologia ou na programação num geral, não existe magia... não existe mesmo! Toda informação está em algum lugar e você pode não conhecer esse lugar e naturalmente assumir que é um local mágico, mas não é.

Então nesta aula nós iremos cavucar um pouco mais o Protocolo HTTP na procura de informações que muitas pessoas encaram como "mágicas" 💪

### Versionamento de API e Endpoint "/status"

A aula de hoje tem muito mais conteúdos sobre API e HTTP, mas ela um objetivo muito claro e que já está super encaminhado, que é completar a tarefa Criar endpoint /status, e em cima disto iremos aprender sobre Versionamento de API e Breaking Changes 🤝

#### Let's code

| Observação
|:------------|
O curso não utiliza `TypeScript`, dessa forma, vou mostrar algumas configurações que utilizo nos meus projetos pessoais

Devido a compatibilidade entre as bibliotecas, atualize todas as dependências do projeto que foram instaladas numa versão específica:

```sh
npm i next react react-dom
```

Instale o `git-commit-msg-linter`:

```sh
npm i -D git-commit-msg-linter
```

Instale e configure o suporte ao `TypeScript`:

```sh
npm i -D typescript @types/node @types/react @types/react-dom
```

crie o arquivos:

`tsconfig.json`

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`next-env.d.ts`

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
```

`next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {}

export default nextConfig
```

Também foi alterado a estrutura de páginas para utilizar o [App Router](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts), para isso renomeie a pasta `pages` para `app` e o arquivo `index.js` para `page.tsx`:

```tsx
const Home = () => <h1>Home</h1>

export default Home
```

criei o arquivo `layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clone TabNews',
  description:
    'Implementação do https://www.tabnews.com.br para o https://curso.dev'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
```

Instale bibliotecas de testes:

```sh
npm i -D jest @types/jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event cross-fetch
```

crie o arquivo `jest.setup.ts`:

```ts
import '@testing-library/jest-dom'
import 'cross-fetch/polyfill'
```

crie o arquivo `jest.config.js`

```js
module.exports = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  modulePaths: ['<rootDir>/src/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
```

crie a primeira rota da `api` em `src/app/api/v1/status/route.ts`:

```ts
import { NextResponse } from 'next/server'

export const GET = async () => {
  return NextResponse.json(
    { message: 'Esta é uma mensagem de resposta' },
    {
      status: 200
    }
  )
}
```

Faça uma requisição a `api`com o `curl` passando o parâmetro `-v` para obter as informações do protocolo `HTTP`:

```sh
curl http://localhost:3000/api/status -v
```

crie os testes automatizados:

`src/tests/integration/api/v1/status/get.test.ts`

```ts
describe('GET to /api/v1/status', () => {
  test('should return 200', async () => {
    const response = await fetch('http://localhost:3000/api/v1/status')
    expect(response.status).toBe(200)
  })
})
```

`src/tests/interface/app/home.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('<Home />', () => {
  test('should render the heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: 'Home', level: 1 }))
  })
})
```

após essas configurações, resultou nos seguintes `scripts`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint:check": "prettier --check .",
    "lint:fix": "prettier --write .",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

## Dia 17

### 🚗 Pista Rápida

Além de conversarmos sobre tudo que foi feito no Dia 17, como as 3 partes que eu considero na escolha de um Banco de Dados, entender o motivo do Docker ter "dominado" o mundo das virtualizações, depois como subir e se conectar a uma instância de Postgres de forma local utilizando o Docker Compose, além de tudo isso, eu passo mais um pouco da minha visão sobre o que faz um sênior ser um sênior na nossa área 💪

### Qual Banco de Dados escolher?

Eu vou começar essa aula de um jeito estranho mas... e se eu te falar que talvez eu fiz a pior escolha de qual banco de dados usar para o TabNews e eu não me arrependo nenhum pouco? 🔥

**Link para issue**

Segue abaixo o link para a issue que eu comentei no vídeo:

https://github.com/filipedeschamps/tabnews.com.br/issues/61

### Por que o Docker dominou o mundo?

Eu vim de uma época que me dói lembrar como que era configurar os serviços num ambiente de desenvolvimento local, porque toda hora algo mágico acontecia 😅 E nesta Pista Lenta vamos conferir a evolução deste assunto, até entrarmos na época dos containers.

### Subir Banco de Dados (Local)

A aula de hoje vai ser bastante prática, pois iremos usar o docker compose para subir um Banco de Dados na sua versão Local 🎉

### Se conectando no Banco de Dados (Local)

Eu deixei você na cara do gol na aula anterior, com o container rodando e servindo o Postgres, mas não sendo possível se conectar nele. E olha só que engraçado, a aula de hoje vai começar tentando se conectar nele mesmo assim para entender de verdade porque não é possível, e por fim, se conectar nele com sucesso 🎉

## Dia 18

### 🚗 Pista Rápida: Dia 18

Como sempre, vamos passar rapidamente pelas principais coisas que aconteceram no Dia 18 (e aconteceram muitas coisas), mas tem algo em especial que eu não deixei claro em nenhuma Pista Lenta que eu quero falar aqui nessa Pista Rápida e que aconteceu 25 vezes 😍

### Criar módulo "database.js"

Nesta aula iremos criar o módulo database.js que é uma abstração da nossa infraestrutura e que vai ser responsável por abrir conexão com o Banco de Dados e enviar queries pra ele. Para isto, vamos instalar o módulo pg na versão 8.11.3 🤝

**Comentário destaque** ⭐️

Depois de ver a aula, sugiro ler [este comentário](https://curso.dev/alunos/filipedeschamps/ca07843d-c389-4722-83f7-55d8de12481b) que fiz sobre a dúvida de outro aluno, pois pode ajudar a clarear alguns pontos importantes sobre a utilidade do database.js 💪

### A importância das Variáveis de Ambiente

Quando eu realmente entendi o poder e a simplicidade das Variáveis de Ambiente, o meu cérebro deu alguns cliques muito importantes. Um deles foi de sempre que possível deixar a camada da aplicação stateless (sem estado) e isso se conecta perfeitamente com várias formas profissionais de se construir e escalar uma aplicação 💪

### Variáveis de Ambiente no Código

Qual a relação entre Variáveis de Ambiente, process, env e o que entra dentro do seu código? Vamos ver tudo isso dentro dessa aula e deixar sua aplicação 100% stateless 💪

### Variáveis de Ambiente no Docker Compose

Como fazer para evitar de ter Variáveis de Ambiente duplicadas no arquivo compose.yaml, no arquivo databse.js e fazer tudo puxar do .env? É isso o que iremos ver nesta aula, fora se deparar com um mistério... vamos ver se você sabe a resposta 🤝

**Mistério: Por quê o Banco de Dados rodou?**

Por que no minuto 02:22 da aula, ao trocar a Variável de Ambiente de POSTGRES_DATABASE para POSTGRES_DB no arquivo .env, a conexão com o Banco de Dados continuou funcionando, se o database.js estava pedindo ainda pela antiga Variável de Ambiente POSTGRES_DATABASE? Você vai precisar investigar para encontrar esta resposta 💪

**Comentário em destaque**

Caso queira saber qual a resposta, sugiro ler [esse comentário](https://curso.dev/alunos/HenriqueNas/b907f191-6823-495b-84b3-bb9494c525c4) que está bastante completo 🤝

#### Let's code

Instale o [node-postgres](https://www.npmjs.com/package/pg)

```sh
npm i pg
npm i -D @types/pg
```

crie o arquivo `.env.development`:

```sh
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=local_user
POSTGRES_DB=local_db
POSTGRES_PASSWORD=local_password
```

instale o `dotenv` e configure o arquivo `jest.config.js`:

```sh
npm i -D dotenv
```

```js
const nextJest = require('next/jest')
const dotenv = require('dotenv')

dotenv.config({
  path: '.env.development'
})

const createJestConfig = nextJest({
  dir: '.'
})

const jestConfig = createJestConfig({
  moduleDirectories: ['node_modules', '<rootDir>'],
  clearMocks: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  modulePaths: ['<rootDir>/src/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
})

module.exports = jestConfig
```

adicione a configuração do `Text Encoder` no arquivo `jest.setup.ts`:

```ts
import '@testing-library/jest-dom'
import 'cross-fetch/polyfill'
import { TextEncoder } from 'util'

global.TextEncoder = TextEncoder
```

crie a pasta `src/infra` e adicione os arquivos:

`compose.yml`

```yml
services:
  database:
    image: 'postgres:16.0-alpine3.18'
    env_file:
      - ../../.env.development
    ports:
      - '5432:5432'
```

`database.ts`

```ts
import { Client } from 'pg'

const getNewClient = async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT as number | undefined,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD
  })
  await client.connect()
  return client
}

const query = async (query: string, args?: string[]) => {
  let client
  try {
    client = await getNewClient()
    const result = await client.query(query, args)
    return result
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    await client?.end()
  }
}

export const database = {
  query
}
```

altere o retorno da rota `/status`:

```ts
import { NextResponse } from 'next/server'
import { database } from '@/infra'

export const GET = async () => {
  const result = await database.query('SELECT 1 + 1;')
  return NextResponse.json(
    { message: result },
    {
      status: 200
    }
  )
}
```

e configure o teste:

```ts
import { database } from '@/infra'

describe('GET to /api/v1/status', () => {
  test('should return 200', async () => {
    const result = await database.query('SELECT 1 + 1;')
    const response = await fetch('http://localhost:3000/api/v1/status')
    expect(result).toBeDefined()
    expect(response.status).toBe(200)
  })
})
```

adicione os `scripts`:

```json
{
  "scripts": {
    "services:up": "docker compose -f src/infra/compose.yml up -d",
    "services:stop": "docker compose -f src/infra/compose.yml stop",
    "services:down": "docker compose -f src/infra/compose.yml down"
  }
}
```

execução:

```sh
npm run services:up
npm run dev
npm run test:watch integration
```

caso deseje, instale o _client_ do `postgres` no sistema operacional:

```sh
sudo apt update
sudo apt install postgresql-client
```

execute o _client_:

```sh
psql --host=localhost --username=local_user --db=local_db --port=5432
```

| Observação
|:------------|
| Após alterar o arquivo `compose.yml` é necessário recriar a imagem, o que poder ser feito de duas formas: `docker compose down && docker compose up -d` ou `docker compose up -d --force-recreate`
| Para sair da conexão do `psql` basta digitar o comando `\q`

## Dia 19

### 🚗 Pista Rápida

Além de revisar tudo o que aconteceu no Dia 19, eu bato de novo na tecla do que é algo ser semântico. Esta é uma palavra que quero usar mais vezes, pois fazer coisas não semânticas inevitavelmente levam a muita confusão na evolução de um sistema, principalmente quando o código é passado de uma pessoa para outra 🤝

### Foi certo fazer o commit do .env?

Como eu antecipei na última Pista Lenta do Dia 18, algumas lapidações importantes precisam ser feitas, incluindo em conhecimento, e eu acho melhor a gente não deixar isso para depois e fazer agora. Então eu gostaria de começar tocando no ponto de que se foi certo ou não fazer o commit do arquivo .env 🤝

**Artigo sobre remover dados sensíveis**

Este é o artigo que eu comentei sobre remover dados sensíveis do histórico do seu repositório: [Remover dados confidenciais de um repositório](https://docs.github.com/pt/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

**Comentário em destaque**

Sugiro ler [esse comentário](abc) do aluno maion explicando como ele usou o BFG para remover dados sensíveis de dois arquivos do seu repositório 💪

### Uma história macabra sobre "Choque Elétrico" e "TDD"

Tem algo que me torra a paciência desde a criação do Node.js que é ele não vir por padrão com um Root Path (Caminho Raiz ou Diretório Raiz) do projeto, que é saber por padrão onde está localizada a raiz dele para trabalhar com Absolute Imports e não somente com Relative Imports. Existe uma forma bastante moderna de solucionar isso e para fazer esta implementação no estilo curso.dev, eu preciso primeiro contar uma história sobre o Guga ter levado um choque por não ter aplicado TDD 🤝

### Configurar o "baseUrl" para "Absolute Imports"

Sem tempo a perder (e sem levar choque), nosso objetivo com essa aula é matar o `../../../../` interminável para acessar o database.js e conseguir referenciar ele apenas como `infra/database.j`s em qualquer que seja o script que queira importá-lo 💪

**Comentário em destaque**

Depois de ver a aula, sugiro ler [este comentário](https://curso.dev/alunos/marini/46f83768-86d5-4d80-b584-4ad9e780de14) sobre um comporamento muito interessante a respeito de iniciar o caminho com / 🤝

### Configurar scripts dos serviços

Essa aqui vai ser mais uma aula com lapidações, mas uma super importante, porque a gente vai deixar o projeto alinhado para quando a gente for trabalhar na issue de Continuous Integration 💪 Fora isso, a aula é repleta com dicas extras 😍

#### Let's code

Baseado no comentário do [brunocmessias](https://curso.dev/web/configurar-scripts-servicos#:~:text=3-,brunocmessias,-28%20dias%20atr%C3%A1s), criei o script `init-dev.sh`:

```sh
#!/bin/bash

function cleanup {
  npm run services:down
  PID=$(lsof -t -i:3000)
  if [ -n "$PID" ]; then
    kill $PID
  fi
  exit 0
}

trap cleanup INT

npm run services:up && next dev
```

scripts no `package.json`:

```json
{
  "scripts": {
    "dev": "./init-dev.sh",
    "services:up": "docker compose -f src/infra/compose.yml up -d",
    "services:stop": "docker compose -f src/infra/compose.yml stop",
    "services:down": "docker compose -f src/infra/compose.yml down"
  }
}
```

## Dia 20

### 🚗 Pista Rápida

Eu já trabalhei com muita gente boa, mas até essas pessoas (uma parte delas pelo menos), deixavam escapar algo extremamente importante... deixavam de pensar sobre algo importante na hora de programar um backend, mas você não vai falhar nisso e é por esse e outros motivos que o Dia 20 existe 💪

### Endpoint "/status": ISO 8601 + Fuso + MVC + lowerCamelCase

Esta é uma descrição difícil de se fazer, pois esta é mais uma daquelas aulas onde eu avanço o projeto e utilizo qualquer oportunidade que consigo para fazer o download de mais conhecimentos. Por isso que além de avançar com o endpoint /status, eu aproveito para falar sobre ISO 8601, Fuso, MVC e lowerCamelCase 💪

### Database "Version" (+ Red, Green e Refactor do TDD)

Chegou a hora de usar 100% de TDD para implementar o retorno do dependencies.database.version. Fora isso, vamos revisitar os 3 Estágios do TDD que são Red, Green e Refactor 💪

🛑 **Atenção**

Para você entender o começo dessa aula, você precisa ficar até o último segundo da aula anterior: [Endpoint "/status": ISO 8601 + Fuso + MVC + lowerCamelCase](https://curso.dev/web/endpoint-status-updated-at) 🤝

### Database "Max Connections"

Já que estamos retornando a Versão do Postgres no endpoint /status, o próximo agora passo é retornar as Conexões máximas e, tecnicamente falando, isso é uma implementação simples, mas vai ser a oportunidade perfeita pra que, no meio da implementação, eu faça uma pergunta muito importante.. uma que evitaria eu ter cometido um erro no TabNews. Vamos ver qual vai ser a sua resposta 😍

### Database "Opened Connections"

Essa Pista Lenta aqui vai ser muito massa, porque ela vai abrir margem pra eu ensinar conceitos muito importantes sobre Banco de Dados, tráfego de dados, fora que a última coisa que falta é injetar no retorno do endpoint /status a quantidade de Conexões usadas pelo nosso backend, na verdade... quantas conexões ao banco estão abertas naquele momento, independente se foi nosso backend ou outro client que está se conectando ao banco 🤝

### SQL Injection e Queries Parametrizadas

O Dia 20 tá bem massa e vai ficar ainda mais, porque nesta Pista Lenta vamos aprender sobre SQL Injection, Queries Parametrizadas, identificar e consertar o problema de Vazamento de Conexões, marcar como concluída a tarefa Finalizar retorno do endpoint /status e concluir a issue Banco de Dados (Local) com muito orgulho 💪

#### Let's code

Pra quem deseja utlizar `TypeScript` no projeto, escrevi um [tutorial no TabNews](https://www.tabnews.com.br/diasjoaovitor/tutorial-como-criar-um-boilerplate-para-projetos-com-next-js) sobre como configurar um boilerplate para projetos `Next`.

Eu fiz algumas alterações no projeto que estamos fazendo no curso e ele está estruturado da seguinte forma:

```sh
tree -a -I 'node_modules|.next|.swc|.git|assets|docs|_'
```

```sh
├── .editorconfig
├── .env.development
├── .eslintrc.json
├── .github
│  └── workflows
│      └── ci.yml
├── .gitignore
├── .husky
│  └── pre-commit
├── .lintstagedrc.js
├── .nvmrc
├── .prettierignore
├── .prettierrc.json
├── .vscode
│  └── settings.json
├── README.md
├── generators
│  ├── plopfile.js
│  └── templates
│      └── index.tsx.hbs
├── init-dev.sh
├── jest.config.js
├── jest.setup.ts
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── src
│  ├── app
│  │  ├── api
│  │  │  └── v1
│  │  │      └── status
│  │  │          └── route.ts
│  │  ├── layout.tsx
│  │  └── page.tsx
│  ├── infra
│  │  ├── compose.yml
│  │  └── database.ts
│  └── tests
│      ├── integration
│      │  └── api
│      │      └── v1
│      │          └── status
│      │              └── get.test.ts
│      └── interface
│          └── app
│              └── home.test.tsx
├── tsconfig.json
└── package-lock.json
```

Estou usando `App Router` ao invés de `Pages Router`, então a estrutura varia um pouco.

O arquivo `route.ts` ficou da seguinte forma:

```ts
import { NextResponse } from 'next/server'
import { QueryResult, QueryResultRow } from 'pg'
import { database } from '@/infra'

export type TStatusBody = {
  updated_at: string
  dependencies: {
    database: {
      version: string
      max_connections: string
      opened_connections: number
    }
  }
}

export const GET = async () => {
  const updatedAt = new Date().toISOString()

  const {
    rows: [{ server_version }]
  } = (await database.query(
    'show server_version;'
  )) as QueryResult<QueryResultRow>

  const {
    rows: [{ max_connections }]
  } = (await database.query(
    'show max_connections;'
  )) as QueryResult<QueryResultRow>

  const databaseName = process.env.POSTGRES_DB as string
  const {
    rows: [{ count }]
  } = (await database.query({
    text: 'select count(*)::int from pg_stat_activity where datname = $1;',
    values: [databaseName]
  })) as QueryResult<QueryResultRow>

  const body: TStatusBody = {
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: server_version,
        max_connections,
        opened_connections: count
      }
    }
  }
  return NextResponse.json(body, {
    status: 200
  })
}
```

Arquivo `layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clone TabNews',
  description:
    'Implementação do https://www.tabnews.com.br para o https://curso.dev'
}

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default RootLayout
```

Arquivo `page.tsx`:

```tsx
const Home = () => <h1>Home</h1>

export default Home
```

Arquivo `database.ts`:

```ts
import { Client } from 'pg'

const getNewClient = async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT as number | undefined,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD
  })
  await client.connect()
  return client
}

const query = async (
  query: string | { text: string; values: (number | string)[] },
  args?: string[]
) => {
  let client
  try {
    client = await getNewClient()
    const result = await client.query(query, args)
    return result
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    await client?.end()
  }
}

export const database = {
  query
}
```

Arquivo `get.test.ts`:

```ts
import { TStatusBody } from '@/app/api/v1/status/route'

describe('GET to /api/v1/status', () => {
  test('should return 200', async () => {
    const response = await fetch('http://localhost:3000/api/v1/status')
    expect(response.status).toBe(200)

    const data: TStatusBody = await response.json()
    const { updated_at } = data

    const parsedUpdatedAt = new Date(updated_at).toISOString()
    expect(updated_at).toBe(parsedUpdatedAt)

    const expectedData: TStatusBody = {
      updated_at,
      dependencies: {
        database: {
          version: '16.0',
          max_connections: '100',
          opened_connections: 1
        }
      }
    }
    expect(data).toEqual(expectedData)
  })
})
```

Arquivo `home.test.tsx`:

```ts
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('<Home />', () => {
  test('should render the heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: 'Home', level: 1 }))
  })
})
```

## Dia 21

### 🚗 Pista Rápida

O Dia 21 é extremamente denso e pode ser um daqueles Dias em que você sai diferente do outro lado, ainda mais numa parte extremamente importante para maioria das aplicações que é o Banco de Dados.

**Cena final**

Os alunos que aparecem na cena final foram os que mais assistiram aulas até o momento em que este vídeo foi produzido (incluindo aulas de Desafio, Capture The Flag e Easter Egg) 🤝

### Investigando logs da Vercel em Produção

Não tem coisa que me assusta mais em desenvolvimento de software do que ficar muito tempo sem fazer deploy em produção. E como o endpoint `/api/v1/status` está retornando erro 500, vamos aproveitar para investigar e provar o que está acontecendo 💪

### Banco de Produção no ElephantSQL (gratuito)

Temos uma missão muito importante que é, nessa aula, criar uma conta no ElephantSQL, criar um banco Postgres lá dentro, pegar as credenciais desse banco, configurar elas nas variáveis de ambiente lá da Vercel e com isso fazer o endpoint /api/v1/status em produção voltar a vida 💪

[Link da issue que comentei](https://github.com/filipedeschamps/tabnews.com.br/issues/120)

**Migrations não estão mais sendo rodadas
Atenção** 🛑

De uma forma assustadora, alguns dias depois desta aula ter sido publicada, a ElephantSQL publicou em [seu blog](https://www.elephantsql.com/blog/end-of-life-announcement.html) que não irá mais aceitar novas contas a partir do dia 01/05/2024 e irá encerrar suas atividades dia 27/01/2025.

Independente disto, a parte educacional da aula mantém 100% de validade 🎉

### Banco de Produção no Neon (gratuito)

A gente não precisa inventar ou se preocupar com mais nada nesse momento a não ser fazer tudo o que a gente fez com o ElephantSQL, mas agora com o Neon, que como falei na aula anterior, é um serviço mais novo e com recursos mais sofisticados 💪

#### Let's code

Adicione o valor abaixo no objeto de configuração da função `getNewClient`:

```js
ssl: process.env.NODE_ENV === 'production'
```

### Banco de Produção no DigitalOcean (pago)

A nossa próxima tarefa é criar uma conta na [DigitalOcean](https://www.digitalocean.com/) e levantar uma instância lá de Postgres 💪 Será que vai ser fácil ou vai ter mais um conhecimento super importante "barrando" o nosso caminho? Spoiler: vai ter e vai ser MUITO massa 😉

#### Observação

Essa aula explica como configurar um serviço que necessita de certificado para funcionar e apresenta a criação da função [getSSLValues](https://github.com/filipedeschamps/clone-tabnews/blob/c5cc52442f9343e940a733a7542214b290e92a90/infra/database.js#L36), na qual não é necessária para o banco de dados `Neon`

## Dia 22

### 🚗 Pista Rápida

Não existe profissional na nossa área, que se considera um profissional completo pelo menos, e que não sabe mexer com migrations. Então, se esta é uma lacuna no seu conhecimento, fica tranquilo, que o Dia 22 veio para resolver isso de uma vez por todas 💪

### Por que as Migrations existem?

Como a gente acabou de encostar no assunto Banco de Dados, o que você acha da gente matar o assunto Migrations que está super relacionado? E é até importante tratar disso agora, no início, porque um projeto que não usa Migrations para o seu Banco de Dados seria mais ou menos análogo a um projeto que não usa versionamento, Git, para o código do seu projeto para manter a integridade e rastreamento das alterações.

### Migrations por Linha de Comando

Nesta Pista Lenta iremos dar passos concretos para se trabalhar com Migrations, onde através da CLI (Command Line Interface) do node-pg-migrate, iremos tanto criar arquivos de migração quanto executar eles para valer 💪

#### Let's code

Instale o `node-pg-migrate` e o `dotenv-expand`:

```sh
npm i -D node-pg-migrate dotenv-expand
```

Adicione a variável de ambiente `DATABASE_URL` no arquivo `.env.development`:

```sh
DATABASE_URL=postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB
```

Adicione os `scripts`:

```json
{
  "scripts": {
    "migration:create": "node-pg-migrate -m src/infra/migrations create",
    "migration:up": "node-pg-migrate -m src/infra/migrations --envPath .env.development up"
  }
}
```

## Dia 23

### 🚗 Pista Rápida

Se o Dia 22 abriu um pouco a sua mente sobre o assunto Migrations, o Dia 23 vai consolidar muita coisa, fora abrir margem pra gente conversar assuntos extremamente importantes e que vão influenciar todo o restante do desenvolvimento 🤝

### Migrations pelo endpoint “/migrations” (Dry Run)

Dessa vez vamos atacar a tarefona "Executar Migrations pelo endpoint /migrations" e continuando nesse ritmo, vai ser inevitável você se tornar um profissional nesse assunto 🤝

### Por que evitar a direção "down"?

Do jeito que o código do /migrations está hoje, tanto se você rodar ele no modo Dry Run, quanto no Live Run, ambos vão executar as Migrations somente na mesma direção, a up, que é ler e executar elas na ordem crescente. Isto não vai mudar e nesta aula irei ter uma conversa muito importante com você dos motivos desta escolha 🤝

**Artigos citados na aula**

- [Pitfalls with SQL rollbacks and automated database deployments](https://octopus.com/blog/database-rollbacks-pitfalls)
- [Stack Overflow: How We Do Deployment - 2016 Edition](https://nickcraver.com/blog/2016/05/03/stack-overflow-how-we-do-deployment-2016-edition/)

### Migrations pelo endpoint "/migrations" (Live Run - Início)

Chegou a hora de implementarmos uma versão do código onde, ao realizar um POST contra o endpoint /api/v1/migrations, as Migrations do sistema são rodadas para valer no modo Live Run, e tudo isso coberto por Testes Automatizados, onde inclusive vamos ver como filtrar os testes de uma forma mais refinada para conseguir isolar apenas a bateria de testes que queremos rodar e isto é fundamental para quando a quantidade de testes for maior 💪

Mas o mais importante desta aula é revelar uma condição na arquitetura dos testes que eu estipulei no começo do TabNews 🤝

**Artigos citados na aula**

- [The argument against clearing the database between tests](https://calpaterson.com/against-database-teardown.html)
- [Thread no Hacker News](https://news.ycombinator.com/item?id=29764792)

## Dia 24

### 🚗 Pista Rápida

O Dia 24 faz parte de uma série de desafios que eu gostaria que você passasse para que uma grande lição faça sentido... algo que na minha visão vai deixar você à prova de balas, ou até melhor, à prova de futuro 💪

### Fazendo o Jest "transpilar" arquivos em ESM

É a partir dessa Pista Lenta que você vai entender o afastamento que dá para ter da Muralha de Negócio que é, no final das contas, ter o endpoint /migrations usável por quem quer consultar ou rodar as Migrations do sistema por essa interface programática. Eu digo isso, porque a gente vai passar por algumas coisas da Muralha Técnica que não são tão semânticas, nem divertidas, pelo menos quando comparado a onde a gente quer chegar. Uma destas coisas é fazer o Jest conseguir ler e utilizar módulos ESM, que é o que iremos resolver dentro desta aula 🤝

**Desafios para próxima aula**

Ao final eu proponho dois desafios:

- Desafio Nível 1: provar através do código que o processo do Jest de fato está rodando no ambiente test e também provar que as credenciais do Banco de Dados não estão sendo injetadas no process.env.
- Desafio Nível 2: fazer o .env.development ser carregado dentro do processo do Jest.

**Como publicar as respostas sem dar spoiler?**

Dentro do corpo da sua resposta, você pode pode utilizar a tag especial `<details>`, por exemplo:

````html
<details>
  <summary>Spoiler</summary>

  Esta parte estará escondida por padrão até que você clique em `Spoiler`. E
  aqui dentro você poderá colocar o que quiser, até outro código, por exemplo:
  ``` js console.log('funcionou!'); ```
</details>
````

O resultado do código acima é isto aqui:

<details>
  <summary>Spoiler</summary>

Esta parte estará escondida por padrão até que você clique em `Spoiler`.

E aqui dentro você poderá colocar o que quiser, até outro código, por exemplo:

```js
console.log('funcionou!')
```

</details>

### Limpando o Banco de Dados

Vamos matar nessa aula o Desafio de Nível 1 e Desafio de Nível 2 para você tanto comparar como eu vou fazer por aqui, quanto pra treinar fazer esse tipo de investigação e como abordar um problema como esse, porque essas habilidades vão valer por muito tempo 💪 E como resultado final, iremos limpar o state do Banco de Dados a cada bateria de teste 🤝

### Expandindo testes e refatorando implementação

Pelo fato de na aula anterior a gente ter conseguido estabilizar os testes - deixar eles reproduzíveis independente de modificarem o state do banco ou não - significa que agora é possível expandir eles, deixar eles mais sofisticados.

Dado a isso eu vou expandir o teste do POST para provar que o endpoint /migrations está fazendo o que ele deveria estar fazendo e também gostaria de aproveitar para fazer algumas refatorações, incluindo introduzir comportamentos novos na implementação concreta do endpoint 🤝

## Dia 25

### 🚗 Pista Rápida

O Dia 25 é um dia muito legal, muito gostoso de se assistir, tanto porque a gente avança a Milestone quanto porque ele contém uma grande lição e até um puxão de orelha. Fora isso, nesta Pista Rápida aqui, você irá ver trechos de uma Live que eu fiz com os Membros do meu canal no YouTube em 2021, quando publicamos pela primeira vez o endpoint /api/v1/migrations em Produção 🤝

### Fazendo Deploy e rodando as Migrations em Produção 🎉

Nesta Pista Lenta iremos concluir a tarefa Executar Migrations pelo endpoint /migrations, fechar a Issue de Migrations e avançar a Milestone 😍 Tudo isso, pois iremos fazer o deploy em produção do que implementamos nos últimos Dias 💪

### Grande lição + Puxão de orelha 💪

Vamos conversar de uma forma mais séria hoje e numa das aulas do Dia 23 eu comentei que, na nossa área é possível seguir por dois caminhos, o caminho que outras pessoas estão seguindo e o caminho que você acabou de seguir... e agora eu gostaria de esclarecer mais o que são esses dois caminhos 💪

#### Let's code

`jest.config.js`

```js
const nextJest = require('next/jest')
const dotenv = require('dotenv')

dotenv.config({
  path: '.env.development'
})

const createJestConfig = nextJest({
  dir: '.'
})

const jestConfig = createJestConfig({
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
})

module.exports = jestConfig
```

---

`package.json`

```json
{
  {
    "scripts": {
      // ...,
      "test": "jest --runInBand",
      "test:watch": "jest --runInBand --watchAll"
    }
  }
 }
```

---

`migrations/route.ts`

```ts
import { NextResponse } from 'next/server'
import { ClientBase } from 'pg'
import migrationRunner, { RunnerOption } from 'node-pg-migrate'
import { join } from 'path'
import { database } from '@/infra'

const getDefaultMigrationOptions = ({
  dbClient,
  dryRun
}: {
  dbClient: ClientBase
  dryRun: boolean
}) => {
  const options: RunnerOption = {
    dir: join('src', 'infra', 'migrations'),
    direction: 'up',
    verbose: true,
    migrationsTable: 'pgmigrations',
    dbClient,
    dryRun
  }
  return options
}

export const GET = async () => {
  let dbClient
  try {
    dbClient = await database.getNewClient()
    const defaultMigrationOptions = getDefaultMigrationOptions({
      dbClient,
      dryRun: true
    })
    const pendingMigrations = await migrationRunner(defaultMigrationOptions)
    return NextResponse.json(pendingMigrations, {
      status: 200
    })
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    await dbClient?.end()
  }
}

export const POST = async () => {
  let dbClient
  try {
    dbClient = await database.getNewClient()
    const defaultMigrationOptions = getDefaultMigrationOptions({
      dbClient,
      dryRun: false
    })
    const migratedMigrations = await migrationRunner(defaultMigrationOptions)
    const status = migratedMigrations.length > 0 ? 201 : 200
    return NextResponse.json(migratedMigrations, { status })
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    await dbClient?.end()
  }
}
```

---

`database.ts`

```ts
import { Client } from 'pg'

const getNewClient = async () => {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT as number | undefined,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === 'production'
  })
  await client.connect()
  return client
}

const query = async (
  query: string | { text: string; values: (number | string)[] },
  args?: string[]
) => {
  let client
  try {
    client = await getNewClient()
    const result = await client.query(query, args)
    return result
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    await client?.end()
  }
}

export const database = {
  query,
  getNewClient
}
```

---

`tests/orchestrator.ts`

```ts
import { database } from '@/infra'

export const cleanDatabase = async () => {
  await database.query('drop schema public cascade; create schema public;')
}
```

---

`get.test.ts`

```ts
import { cleanDatabase } from '@/tests/orchestrator'

describe('GET to /api/v1/migrations', () => {
  beforeAll(cleanDatabase)

  test('should return 200', async () => {
    const response = await fetch('http://localhost:3000/api/v1/migrations')
    expect(response.status).toBe(200)

    const responseBody = await response.json()

    expect(Array.isArray(responseBody)).toBe(true)
    expect(responseBody.length).toBeGreaterThan(0)
  })
})
```

---

`post.test.ts`

```ts
import { cleanDatabase } from '@/tests/orchestrator'

describe('POST to /api/v1/migrations', () => {
  beforeAll(cleanDatabase)

  test('should return 200', async () => {
    const response1 = await fetch('http://localhost:3000/api/v1/migrations', {
      method: 'POST'
    })
    expect(response1.status).toBe(201)

    const response1Body = await response1.json()
    expect(Array.isArray(response1Body)).toBe(true)
    expect(response1Body.length).toBeGreaterThan(0)

    const response2 = await fetch('http://localhost:3000/api/v1/migrations', {
      method: 'POST'
    })
    expect(response2.status).toBe(200)

    const response2Body = await response2.json()

    expect(Array.isArray(response2Body)).toBe(true)
    expect(response2Body.length).toBe(0)
  })
})
```

## Dia 26

### 🚗 Pista Rápida

No Dia 26 você vai ver duas coisas muito importantes acontecendo na sua frente: o ambiente de Homologação tomando forma e servindo pra debugar um problema real e o "Espírito Open Source" brotando por dentro dos comentários aqui na plataforma do curso.dev 😍

### Git Branch (3 níveis de compreensão)

Nesta aula você irá aprender sobre um dos recursos mais importantes do Git na minha opinião que se chama branches! E entender de branches pode ser a coisa mais simples do mundo ou mais complicada do mundo dependendo do modelo mental que você usar pra entender o que está acontecendo. Por conta disso eu gostaria de fazer 3 explicações para você, que são na verdade 3 níveis de compreensão sobre a feature de branches 🤝

**Link para o comentário**:

Este é o link do comentário do leandl que virou uma thread sensacional com espírito open source:

https://curso.dev/alunos/leandl/3988bdf7-3545-4163-a954-400595538126

### Fazendo deploy em Homologação (Staging)

Pelo fato da gente não somente saber criar branches, mas entender como elas realmente funcionam por baixo dos panos, isso possibilita agora a gente criar ambientes de Homologação que em inglês a turma lá se refere como Staging e que a Vercel escolheu dar o nome de Preview, que não deixa de ser uma pré-visualização do que está para acontecer.

#### Let's code

```sh
curl -s https://clone-tabnews-diasjoaovitor.vercel.app/api/v1/status | python3 -m json.tool

curl -s -X GET http://localhost:3000/api/v1/migrations | python3 -m json.tool

curl -s -X GET https://clone-tabnews-diasjoaovitor.vercel.app/api/v1/migrations | python3 -m json.tool
```

## Dia 27

### 🚗 Pista Rápida:

Apesar do Dia 27 ser um dia relativamente curto, ele pode salvar a sua vida (ou a vida de um colega seu) 🤝 💪

### Como nunca mais perder código com Git? (Desafio Prova de Fogo 🔥)

Na aula anterior eu falei que a gente iria fazer o merge do que está dentro da branch fix-migrations-endpoint para dentro da branch main e saber fazer isso de verdade (sabendo o que está acontecendo por baixo dos panos) é algo muito poderoso 💪

Só que com grandes poderes vêm grandes responsabilidades e, o fato de saber criar branches e fazer o merge delas, expõe você a perder parte do seu trabalho. Então esta é uma aula extremamente especial que ensina como utilizar o git reflog para nunca mais perder o que você programou!

### Git Merge (Fast Forward)

Agora sim, chegou o momento que a maioria das pessoas tem medo... o Merge! Isso assusta muita gente porque, se você não conhece os fragmentos, os objetos por baixo dos panos do Git, como a gente tá conhecendo aqui pelo curso.dev, tudo é muito nebuloso, confuso, mas não é... no fundo no fundo é simples.

#### Let's code

```sh
sudo apt install jq
watch -n 1 'curl https://clone-tabnews-diasjoaovitor.vercel.app/api/v1/status | jq'
curl -s -X GET  https://clone-tabnews-diasjoaovitor.vercel.app/api/v1/migrations | jq
```

## Dia 28

### 🚗 Pista Rápida

O Dia 28 é um dia baga, e por isso entenda que é um dia denso, que vai fazer você ficar pensando por muito tempo em certas dinâmicas perigosas da nossa área, porque o objetivo é entender sobre Continuous Integration, Continuous Delivery e Continuous Deployment, mas não só entender o que são essas coisas, isso é fácil, o objetivo principal é entender por que a gente criou essas coisas 🤝

**Link da apresentação**

[Agile is Dead • Pragmatic Dave Thomas • GOTO 2015](https://www.youtube.com/watch?v=a-BOSpxYJ9M)

### Nascimento e "Morte" do Movimento Ágil

Esta é uma aula importante para entender "de onde viemos e para onde estamos indo" na nossa área, começando pela metodologia Waterfall e como que isto impulsionou o Movimento Ágil iniciado em 2001. E como nem tudo são flores, eu destaco também desafios que tive ao longo da minha gestão no Pagar.me e como que o "abuso do Movimento Ágil" levou a uma queda na produtividade e satisfação das equipes.

De qualquer forma, a parte ágil do movimento está longe de morrer e daqui para frente iremos ver o impacto que isso teve na forma que trabalhamos e iremos trabalhar por muito tempo 💪

### Continuous Integration, Delivery e Deployment

Na aula passada nós aprendemos sobre o fluxo de trabalho Waterfall que inevitavelmente acaba sendo um processo muito demorado. Dado a isso, o Movimento Ágil definiu que um dos seus objetivos era reduzir o Ciclo de Feedback e aumentar a velocidade de entrega para 15 dias, 7 dias, 1 dia ou, no limite, colocar na mão do cliente algo que foi programado no mesmo dia. Então nesta aula vamos ver como isso é possível 💪

### Trunk-Based Development, Feature Branch e Git Flow

Uma das decisões mais geniais feitas no Git, no design do core dele, foi de que não existem branches especiais e isso deu aos desenvolvedores uma flexibilidade enorme para criar qualquer tipo de fluxo de trabalho. Dado a isso, nesta Pista Lenta irei revisitar os 3 principais fluxos, sendo que, a parte mais importante, é entender o motivo real de tanta preocupação sobre o assunto e tudo pode ser resumido em uma única palavra: entropia 🤝

> lupesi

```json
"Estratégias de branch":[
    {
      "Trunk-Based Development": [
        "Nessa estratégia todos os commits realizados são continuamente integrados com a branch trunk, ou melhor tronco, no nosso caso a main. Isso de inicio parece perigoso, pois diversos programadores integrando diferentes features direto na branch de produção, parece que vai explodir, por isso são adotadas algumas medidas para impedir isso",
        "FEATURE FLAG - Nessa medida, as features tem flags, marcadores, que sinalizam ao sistema o que ele deve exibir para cada usuário, um exemplo simples seria, features com flags de 'beta tester' serão exibidas para quem é 'beta tester' e não para o restante",
        "Além disso é muito importante sempre estar integrando constantemente o trunk, para diminuir a entropia entre os desenvolvedores, fazendo até mesmo commits parciais",
        "BRANCH BY ABSTRACTION -  Nessa medida são utilizadas abstrações para realizar grandes mudanças no sistema, por exemplo, os desenvolvedores utilizam um modulo A que irá ser mudado, então é adicionado uma abstração que liga ao módulo, e cada feature irá se ligar a essa abstração e quando todos estiverem integrados com a ela, a mesma poderá trocar o modulo na qual ela se liga, fazendo com que essa alteração não cause tanto prejuizo"
      ],
      "Feture Branch": [
        "Na branch main, serão commitados somente alterações prontas para o deploy, enquanto as features são desenvolvidas em outras branchs que posteriormente são integradas a main. Enquanto cada feature está sendo desenvolvida, o projeto estará também avançando, sendo então, importantissimo a correção de conflitos ao integrar a main",
        "O github envolve essa estratégia com ferramentas exelentes de visualização e revisão de código, sendo até chamada de github flow"
      ],
      "Git Flow": [
        "Essa estratégia é focada para sistemas que mantém multiplas versões do mesmo software. Sendo bem complexa",
        "Na main serão commitadas apenas as verções, a programação é desenvolvida na branch develop que também se ramifica para outras branchs features. Importante destacar que caso seja encontrada um bug critico em produção é criada a partir da main uma branch chamada de hotfix que conserta o bug e posteriormente é integrada na main e na branch develop.",
        "Quando uma feature é completada ela é revisada e integrada a branch develop, quando tudo nessa branch for completado, é passado para uma branch chamada de release, onde as modificações são revisadas minuciosamente, onde se for encontrado um bug é concertado direto na mesma branch e quando tudo estiver completo, integramos com a branch main, criando uma nova versão do software",
        "Sempre importante manter as branchs develop e feature no mesmo 'nivel' da main"
      ]
    }
]
```

## Dia 29

### 🚗 Pista Rápida

Eu gosto de todos os conteúdos aqui do curso.dev de todos os Dias, mas tem alguns que olha... tem alguns que abrem oportunidades que são simplesmente sensacionais e o Dia 29 tem uma dessas oportunidades que é um Experimento Social com os alunos 💪

### Estabilizar "npm run dev"

Eu gostaria de inaugurar o Dia 29 dizendo que o meu sonho era criar um sistema em que eu subisse ele inteiro com um único comando. Eu digo isso porque, em todas as empresas que eu trabalhei, era sempre um inferninho configurar o ambiente local pra rodar um Site ou uma API.

Então quando eu estava fazendo o TabNews (tirando instalar dependências básicas ou rodar o npm install pra instalar as dependências específicas do projeto) eu queria conseguir rodar o npm run dev e tudo acontecesse: Banco de Dados levantasse, Migrations rodassem, Servidor Web, Servidor de Emails, tudo abstraído dentro de um único comando... assim foi feito e agora chegou a hora de começar a fazer isso também aqui no FinTab 💪

**Link comentado no vídeo**

https://github.com/filipedeschamps/tabnews.com.br/pull/329

**Link para o commit feito na aula**

- [adds wait-for-postgres.js script](https://github.com/filipedeschamps/clone-tabnews/commit/78fcf9bbeb3d01aa6117dbd26c2383aa7fc23cbb)

#### Let's code

> lupesi

```json
{
  "Estabilizar npm run dev": [
    "Queremos que todas as dependencias do nosso sistema sejam diretamente acionadas apenas ao executar um comando, e por enquanto isso não ocorre, pois o sistema de migrations deve ser rodado separadamente. Colocando ele no mesmo comando do run dev, é visto um problema, depois de executar o up dos serviçoes postgres, que estam rodando no -d, passam direto para o comando das migrations, causando um problema de race condition, onde as migrations são executadas antes mesmo que o postgres consiga fazer conexões",
    "Então criamos o script 'wait-for-postgres' que verifica o estado do postgres até que ele retorne estar pronto.",
    "Nesse script importamos o exec do node:child_process, uma função que cria um novo processo de shell e executa um comando nele, que usaremos para executar um comando no qual o docker retornará a condição do postgres, docker exec postgres-dev pg_isready --host localhost, quando executado ele chama uma função de callback que procura na resposta do comando 'accepting connections', caso não exista ele executa novamente a verificação até que retorne a resposta esperada, siginificando assim, que o postgres está pronto para conexões"
  ]
}
```

**Link do commit**:

- [chore: adds `wait-for-postgres.js`](https://github.com/diasjoaovitor/clone-tabnews/commit/d3bae9255d601b88e5fdb70febcfddb1a434c576)

Os comentários de `LeoAnders` e `devjuan` apresentam uma alternativa para exibir os logs com o módulo [ora](https://www.npmjs.com/package/ora)

**Link do comentário**:

- https://curso.dev/alunos/LeoAnders/d447aad5-d06b-4f84-aeb6-ceb898a352e2

### Estabilizar "npm test" (Paralelismo)

Você está pronto para subir mais um passo na escada até chegar no `CI`? Ótimo, porque chegou a hora da gente atacar a tarefa: `Estabilizar Testes Locais` e iremos começar pela parte do `Paralelismo` do comando `npm test`, conhecimento que inlcusive pode ser utilizado para várias outras situações 💪

**Link para a página do concurrently no NPM**

- [https://www.npmjs.com/package/concurrently](https://www.npmjs.com/package/concurrently)

> lupesi

```json
{
  "Estabilizar npm run test": [
    "Agora temos outro problema, quando executamos o comando de teste sozinho, ele retorna erro em todos os testes, isso acontece pois os outros serviços não estão executando juntos, causando assim o erro.",
    "Primeiramente podemos começar adicionando ao comando a parte que levanta o docker e espera ele estar pronto, npm run services:up && npm run wait-for-postgres",
    "Ainda continua dando erro, isso porque o servidor não está sendo executado junto, o problema é: o servidor não roda em modo detached",
    "Usaremos então o concurrently para executar comando concorrentes, concurrently -n next,jest --hide next -k -s command-jest 'next dev' 'jest --runInBand'",
    {
      "Parâmetros": [
        "-n, abreviação de --names, nomeia o log de cada processo.",
        "--hide, esconde os logos de determinado processo",
        "-k, abreviação de --kill-others, mata todos os outros processo quando um retorna sucesso",
        "-s, abreviação de --sucess, retorna 0 quando um processo desejado retorne 0 também"
      ]
    }
  ]
}
```

### Estabilizar "npm test" (Orquestrador)

Chegou a hora de programar o `Orquestrador` e fazer um `Experimento Social` de verdade aqui com os alunos do `curso.dev`, incluindo você 😍

**Link do Pull Request**

Aqui está o link que eu comentei: [https://github.com/filipedeschamps/clone-tabnews/pull/21](https://github.com/filipedeschamps/clone-tabnews/pull/21)

**Link para a página do async-retry no NPM**

- [https://www.npmjs.com/package/async-retry](https://www.npmjs.com/package/async-retry)

## Dia 30

### 🚗 Pista Rápida

O `Dia 29` levantou uma bola que foi muito bem cortada aqui no `Dia 30` por todo mundo do `curso.dev` num nível que eu não to conseguindo me acreditar até agora 🎉 Então nesta `Pista Rápida` iremos analisar tudo o que aconteceu e, ao final dela, irei colocar mais uma **dica** que me fez ganhar bastante espaço nas empresas que trabalhei 💪

**Link do Pull Request**

Aqui está o link que eu comentei: [https://github.com/filipedeschamps/clone-tabnews/pull/21](https://github.com/filipedeschamps/clone-tabnews/pull/21)

### rafaelcorrea-dev: "maxTimeout"

**MUITA** gente contribuiu com o `Pull Request` sobre o `Experimento Social` e nessas horas é importante adotar uma **estratégia** de como encarar ele. Dado a isso, fiz a decisão de **separar** o que são sugestões sobre `refatoração` de sugestões que alterem a `mecânica` ou `performance` do script `npm test` e nesta `Pista Lenta` irei atacar a sugestão do [rafaelcorrea-dev](https://github.com/rafaelcorrea-dev) sobre o parâmetro `maxTimeout` do `async-retry` 🎉

### FernandoWeber, aprendendofelipe, Ilopesr: "Windows"

**Muita** coisa aconteceu desde a última aula, sugestões super válidas continuaram entrando no Pull Request, incluindo sobre a **compatibilidade** do script `npm test` com o sistema operacional `Windows` 🤝 Estas sugestões ganharam força através dos alunos `FernandoWeber`, [`aprendendofelipe`](https://github.com/aprendendofelipe) e [`Ilopesr`](https://github.com/Ilopesr) 💪

### andrecruzmendes, KleitonBarone, MarcosASFigueiredo: "/status"

Na aula passada eu falei que **duas** pessoas tinham encostado a mão em cima de um `bug`, mas não conseguiram destacar com clareza onde estava o problema. O interessante é que, depois disso, eu notei que uma **terceira** pessoa consertou esse suposto `bug`, mas não pelo motivo da existência dele 😳 Então nesta aula vamos analisar as contribuições dos alunos [`andrecruzmendes`](https://github.com/andrecruzmendes), [`KleitonBarone`](https://github.com/KleitonBarone) e [`MarcosASFigueiredo`](https://github.com/MarcosASFigueiredo) 🎉

**Link para o commit feito na aula**

- [makes `npm test` more robust with `async-retry` and `orchestrator.js`](https://github.com/filipedeschamps/clone-tabnews/commit/6d2c744b25c751f17abedbc8d8223eab3548c6ed)

## Dia 31

### 🚗 Pista Rápida

Em todos os `Dias` da plataforma eu tento passar conhecimentos que vão deixando o projeto mais **profissional**, tanto **diretamente** trabalhando na parte técnica dele, quanto **indiretamente** com conhecimentos que vão impactar a sua postura, que isto vai impactar na qualidade do trabalho que você consegue executar no dia a dia e, que por fim, vai impactar na parte técnica de qualquer projeto que você **encostar** daqui pra frente. O massa é que o `Dia 31` não foge desse padrão, aliás, foge sim, porque o projeto dá um salto inédito de profissionalismo 💪

### Configurar "Continuous Integration" (com GitHub Actions)

Olha só que massa desenvolver as coisas de forma **orgânica**: de um lado, o assunto `Continuous Integration` assusta muita gente (é como se fosse uma coisa muito difícil de se atingir) e do outro lado tem **você**, agora, neste exato momento, que já fez a **maioria** das coisas que se precisava fazer pra atingir justamente o estágio de `Continuous Integration` e só falta dar um **_chutinho pra bola entrar no gol_** ⚽️ 🎉

**Link para o commit feito na aula**

- [adds `Automated Tests` GitHub Action](https://github.com/filipedeschamps/clone-tabnews/commit/4a8ff19415b5a247ca946638a80f0e395355d97b)

### Lint Code: Style

Chegou o momento **perfeito** para esclarecer algumas categorias das ferramentas de `Linting`, tanto de `estilo` quanto de `qualidade`, e nesta Pista Lenta iremos engatar no nosso `CI` a **garantia** de que a **estilização** do código está **100%** utilizando o `Prettier` 💪

**Desafio**

Ao final eu proponho um **novo desafio** para você... você topa? 😍

**Links para os commits feitos na aula**

- [adds `Linting` GitHub Action](https://github.com/filipedeschamps/clone-tabnews/commit/d2aea6fbbb6f796804d2353fb21d94e554fcda71)
- [fix `prettier` style linting](https://github.com/filipedeschamps/clone-tabnews/commit/66debb49178a6180d698ae2957d84f96aba4a03f)

### Lint Code: Quality

Então o desafio agora é trazer o `ESLint` para o nosso projeto para ele ajudar a manter certas regras básicas de **Qualidade de Código** e engatar isso no fluxo do `CI` para que essas regras sejam garantidamente aplicadas 🤝

Ao executar o comando `next lint`, o Next irá instalar as versões mais atualizadas dos módulos `eslint` e `eslint-config-next`. No entanto, conforme apontado pelo aluno [`matheusl`](https://curso.dev/alunos/matheusl/f3da2fca-8ba5-4412-a9de-ef53365e012e), a versão mais atual do ESLint é incompatível com a versão do Next que estamos utilizando no projeto até esse ponto. Portanto, após a instalação automática desses pacotes pelo Next, você deverá alterar manualmente para as versões usadas na aula com o comando `npm install eslint@8.57.0 eslint-config-next@14.2.4`, a fim de evitar esse problema de compatibilidade.

**Links para as páginas no NPM dos plugins instalados**

- [https://www.npmjs.com/package/eslint-plugin-jest](https://www.npmjs.com/package/eslint-plugin-jest)
- [https://www.npmjs.com/package/eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)

**Links para os commits feitos na aula**

- [adds `lint:eslint:check` script with `ESLint`](https://github.com/filipedeschamps/clone-tabnews/commit/38287e909c5db5f3601b95bf798a56ce3e586549)
- [adds `eslint` job in `Linting` GitHub Action](https://github.com/filipedeschamps/clone-tabnews/commit/83462d4f629d09065298593e27c4247abf23685f)
- [fix `eslint` linting](https://github.com/filipedeschamps/clone-tabnews/commit/b776dc629f71447cb1a79e94fe74dda54ec6dc82)

## Dia 32

### 🚗 Pista Rápida

Os alunos que passarem por todas as Pistas Lentas do Dia 32 vão dar um salto na frente de muitos profissionais do mercado. Isso porque temos uma conversa séria sobre o "medo de commits", boas práticas, como separar "mudanças lógicas" em commits distintos e qual convenção iremos utilizar daqui para frente 🤝

### É verdade mesmo que commits bem feitos fazem diferença?

Por algum motivo que eu ainda estou para descobrir, o assunto `Commit` coloca uma **pressão extra** na gente... você sente isso também? Se não sente, você vai sentir em algum momento, por isso que eu quis separar esse assunto no seu próprio `Dia` para novamente a gente conseguir conversar com qualidade em cada parte desse tema e para também eu não precisar passar chutado por um tema sensível e **acalorado** 🔥

### Como definir o escopo de um commit?

Se a aula anterior deixou você com o **estômago embrulhado**, ótimo, porque a partir dessa aula eu vou fazer de tudo para **desembrulhar**, começando por entender melhor onde **começa** e **termina** um `commit`, como que eu defino quais arquivos ou quais alterações participam de um `commit` e quais deveriam participar de outro 🤝

<details>
  <summary><strong>Spoiler (clique somente depois de assistir a aula)</strong></summary>
<br>
Sobre o **plot twist** ao final da aula, a minha opinião é que, neste caso, a alteração no `código` e alteração da `documentação` deveriam ser feitos em um mesmo `commit`. O racional por trás disso é que eles existem por um **mesmo motivo** e deixar eles num estado **dessincronizados** poderá causar confusão no consumo do produto. Isto porque, o `código` do produto irá estar se comportando de uma forma diferente do que a `documentação` está instruindo.

Imagine uma situação onde uma **ação** no produto, que antes poderia ser **desfeita** e está documentada que possui essa habilidade (como por exemplo **deletar uma publicação** e em seguida **desfazer** essa ação), agora com uma nova versão do `código` não é mais possível **desfazer**. Caso o `commit` que implementa no `código` a remoção do comportamento de desfazer entre em produção de forma descasada com a atualização da `documentação` informando que não é mais possível esta ação, usuários que estão lendo a `documentação` (desatualizada), por um momento poderão contar com um recurso que na prática **não existe mais**.

Conclusão: eu "grudaria" estas duas alterações em um único `commit` para não correr o risco de ficar dessincronizado.

</details>

### Como definir a mensagem de um commit?

Chegamos na última aula **teórica** sobre como podemos nos tornar profissionais mais **completos** no assunto `commit`, onde o ponto de destaque é sobre o `Tempo verbal` utilizado ao escrever a mensagem principal 🤝

**Links**

- Falando em `Tempo verbal`, sugiro ler [este comentário do andrecruzmendes](https://curso.dev/alunos/andrecruzmendes/ca7f4617-03bc-4142-b05a-b5615e48905d) que está sensacional 🎉
- Site do [Conventional Commits](https://www.conventionalcommits.org/) (versão [Português](https://www.conventionalcommits.org/pt-br/v1.0.0/))

## Dia 33

### 🚗 Pista Rápida:

No meio do Dia 33 acontece um evento que eu estava louco pra acontecer! É um evento que, quando acontece com você e você não tá preparado, dá uma suadeira bonita, um calafrio no corpo inteiro, mas que com a didática aqui do curso.dev, o que parece ser um monstro indomável, se torna uma ferramenta muito poderosa no seu dia a dia 🤝

### Lint dos commits (Local)

Vamos colocar a mão na massa na parte técnica e começar julgando o que até então tecnicamente eu fiz com os commits do projeto e depois vamos incluir novas dependências para nos ajudar a escrever mensagens no formato certo 💪

#### Let's code

Testar mensagens de commit:

```sh
echo "teste" | npx commitlint
```

### Lint dos commits (CI)

Esta vai ser uma `Pista Lenta` muito massa, muito massa **MESMO**, porque não somente eu e você vamos fazer o `CI` barrar `commits` fora do padrão, como também **elevar** os conhecimentos em `Git`, isso porquê gente vai dar o primeiro passo dentro de um comando que muita gente tem medo: `git rebase` 🔥

### Git Hooks para criação de commits (+ Desafio)

Simplesmente **sensacional** que o nosso `CI` agora está **barrando** mensagens de `commit` com o formato errado, **trancando** o `Pull Request`, mas agora também não quero mais fazer `push` de coisa errada e passar vergonha, não é mesmo? Então nesta aula vamos colocar a mão na massa nos `Hooks` do `Git` para entender como que eles podem nos ajudar na missão de validar os `commits` de forma local 💪

## Dia 34

### 🚗 Pista Rápida

Dentro do `Dia 34` acontece um **problema** que eu não planejava e isso se tornou um **conteúdo raríssimo** e que vai ser mais um daqueles **conhecimentos** que você fica até **mais feliz** e se sente um **profissional melhor** só por possuir ele.

Fora isso, eu quero mostrar um conteúdo `bônus` que eu não mostrei em nenhuma das `Pistas Lentas` 💪

**Artigo citado no vídeo**

- [npm audit: Broken by Design](https://overreacted.io/npm-audit-broken-by-design/)

### Uma história macabra sobre "Tipo da Licença"

A minha ficha caiu sobre a **importância** de uma `licença` por volta de `2017` quando a `Meta`, na época chamada ainda de `Facebook`, entrou numa **grande polêmica** por conta do `React` (na verdade não especificamente sobre o `React`, mas sobre a `licença` dele) 🔥

### Semantic Versioning

Para nossa sorte, quando o sistema de módulos do `Node.js` foi padronizado, se escolheu o `Semantic Versioning` para ditar o que seria escrito na versão de cada módulo. Isso porque, na versão de um software, você pode escrever qualquer coisa, como por exemplo: `v1`, `v2`, `v3` ou `r2010-a` e ninguém sabe o que isso significa só olhando para esse tipo de versão. Isso acontece, porque essas versões não possuem **semântica** alguma contida nelas, e é aí que entra a `Versão Semântica`, pois ela obedece uma **estrutura** que carrega um **significado semântico**, ou seja, ela, por conta própria, **transmite um significado**.

### Resolvendo conflito de "Peer Dependencies"

Você sabe que alguém já foi **picado** pela **cobra** do `Semantic Versioning` quando toda hora essa pessoa está preocupada na **consistência** entre as instalações de um projeto. Mas talvez, pior do que isso, é você se encontrar com um erro de `Peer Dependency` que, para a nossa **sorte**, isso aconteceu ao longo da aula no momento em que as **dependências** estavam sendo **atualizadas** e tudo foi registrado e explicado com a **_"didática `curso.dev`"_** 💪

### Finalizando atualizações

Nesta aula vamos continuar atualizando as **dependências**, incluindo sobre as versões `major` e levar este assunto até ao final, até abrir o `Pull Request` 💪

## Dia 35

### 🚗 Pista Rápida:

Quantas vezes na sua vida, você deixou de perceber que você concluiu uma tarefa que estava muito além da capacidade da pessoa que você era quando iniciou a tarefa? 💪

### Refatorando Scripts e "Efeito Estilingue Infinito"

Esta é uma `Pista Lenta` bem menos densa, ao menos comparada com as últimas, mas isto não significa que não terá **conhecimentos importantes**, muito pelo contrário, eu falo sobre o `Efeito Estilingue Infinito` que é algo que pode fazer **muita diferença** na sua vida e carreira, e também colocamos a mão na massa refatorando a seção `scripts` do `package.json` 🤝

### Refatorando Testes Automatizados

Nesta aula iremos **refatorar** os **Testes Automatizados** para seguir um **novo padrão** que separa o `Contexto` da `Afirmação`. A ideia é tirar **duplicidade de informação** e evitar que a descrição dos testes fique fora de sincronia com o que o código realmente faz, pelo menos na parte da `Afirmação` para que o código seja a única fonte de verdade 🤝

### Encerramento da Milestone 1 🎉

Nesta aula, encerramos com **muito orgulho** a `Milestone Fundação` 💪 💪 💪 E para isso, revisamos a sugestão de mais `2` alunos e aplicamos elas de uma forma que até uma pessoa **sênior** ficará impressionada 😍 Por fim, consertamos um bug no projeto que estava sendo escondido pelo fato do ambiente do `CI` apontar que tudo estava `100%`, mas não estava 🤝

## 📸 Tira uma "selfie" comigo?

Eu vou te falar... é só no `curso.dev` que essas coisas acontecem 😂 📸

### Instagram

Você topa me marcar lá no Instagram?
O meu perfil é o [`@filipedeschamps`](https://www.instagram.com/filipedeschamps/) 😍

🔴 Caso o seu perfil seja `privado`, você primeiro precisa mandar uma mensagem aqui pedindo para eu adicionar você como amigo, para depois me marcar no stories, caso contrário, eu não irei receber notificação.

E mesmo assim, peço que me avise pelos comentários que você publicou e me marcou no Instagram, pois as vezes ele não me notifica 🤝

### LinkedIn

Caso queira me marcar no LinkedIn, meu perfil é este: [https://www.linkedin.com/in/filipedeschamps/](https://www.linkedin.com/in/filipedeschamps/)

#### Publicar imagem nos comentários

Caso você queira publicar a imagem nos comentários, você pode utilizar este serviço **gratuito** que não precisa de cadastro: [https://imgur.com/](https://imgur.com/)

**Passos para publicar a imagem**:

1. Abra o [https://imgur.com/](https://imgur.com/) e após o site carregar, simplesmente arraste a imagem **diretamente** para ele.
2. Após finalizar o upload, no canto superior direito da própria imagem, clique no botão `...` e escolha a opção `Get share links`.
3. No momento que estou escrevendo estas instruções, **nenhum formato** disponibilizado é compatível com `Markdown`, porém o mais próximo é o que está dentro de `BBCode (Forums)`, e que será algo assim:

   ```md
   [img]https://i.imgur.com/UKRJMdy.jpeg[/img]
   ```

4. Altere o formato acima para o `Markdown` abaixo:

   ```md
   ![](https://i.imgur.com/UKRJMdy.jpeg)
   ```

5. Pronto! Ao utilizar o formato `Markdown`, a imagem irá aparecer automaticamente com a sua publicação 🎉

## Eu tenho uma dificuldade... me ajuda? 🤝

Não sei se você já esbarrou em alguma propaganda do `curso.dev` mas, se esbarrou, nota que eu tenho uma **dificuldade enorme** de passar para as pessoas que isso aqui não é um curso normal... que a experiência, a vivência aqui dentro é algo diferente.

O detalhe é que é só você quem está vivendo isso na posição de `aluno`, porque eu estou aqui do outro lado na posição de `instrutor`, então é realmente só você quem vai conseguir vivenciar a experiência `curso.dev` e talvez com isso arranjar as palavras certas para descrever o que tá acontecendo aqui dentro, ainda mais agora depois de completar `35 Dias` de material e encerrar a `Milestone Fundação` 🤝

### Tópicos que eu tenho curiosidade

1. Quais foram os impactos dos materiais na sua vida `pessoal` ou `profissional`?
2. Você percebeu uma mudança na sua `postura` ou forma de encarar desafios após esses 35 Dias?
3. Qual `aula` ou `conhecimento` apresentado até então que teve o maior impacto em você?
4. Como os conhecimentos influenciaram a maneira como você pensa sobre `programação` ou `carreira`?
5. Você conseguiu conquistar algo como uma promoção, emprego ou reconhecimento durante este tempo?
6. O que você diria para alguém que foi `traumatizado` por `"vendedores de curso"` e está com dúvidas se será a mesma coisa ao se matricular no `curso.dev`?
7. E por fim: Como você descreve a experiência `curso.dev` para alguém lá de fora?

#### Atenção 🛑

Da mesma forma que no primeiro `Pitstop`, tudo que você escrever abaixo ficará **público** na Home ([https://curso.dev/](https://curso.dev/)), junto como o seu `username`. E como está sendo utilizado o exato mesmo sistema de comentários das outras aulas, você poderá interagir com outros depoimentos, seja adicionando novos comentários ou qualificando. Esta é uma área controlada pelos alunos 💪

Eu só irei interferir caso algum depoimento ou comentário venha ferir os Termos de Uso da plataforma, combinado? 🤝

## Dia 36

### 🚗 Pista Rápida:

O `Dia 36` é o `Dia` em que eu e você abrimos a `Milestone` mais **importante** do projeto 💪 🤝

### Promessa importante daqui para frente 💪

Para inaugurarmos a próxima Milestone do jeito certo e tendo você na sua **maior capacidade**, eu gostaria que você fizesse uma **promessa**, uma muito importante e que vai **libertar** você a se desafiar mais daqui para frente 💪
