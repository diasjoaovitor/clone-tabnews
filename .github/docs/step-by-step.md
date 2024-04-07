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

```
lts/hydrogen
```

execute os comandos:

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

Crie o arquivo `.gitignore`:

```
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

```
yarn add -D prettier
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

```
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

```
sudo apt install dnsutils
```

Exemplo:

```
dig fintab.com.br

;; ANSWER SECTION:
fintab.com.br.          0       IN      A       76.76.21.142
fintab.com.br.          0       IN      A       76.76.21.9
```

```
dig fintab.com.br TXT

;; ANSWER SECTION:
fintab.com.br.          0       IN      TXT     "Sou apaixonado pelos alunos do curso.dev"
```

```
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

```
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

```
yarn add -D jest@29.6.2
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
