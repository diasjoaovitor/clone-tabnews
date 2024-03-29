# Step by step for curso.dev

```
quinta-feira, 28 de março de 2024
```

### Dia 1 e 2

I just watched classes

---

```
sexta-feira, 29 de março de 2024
```

## Dia 3

### A primeira parede

```
yarn init -y
git init
```

create `.nvmrc`:

```
lts/hydrogen
```

and: 

```
nvm install
nvm alias default lts/hydrogen
```

```
yarn add next@13.1.6 react@18.2.0 react-dom@18.2.0
```

## Dia 4

### Página inicial

create `src/pages/index.js`:

```js
export default () => (
  <h1>Home</h1>
)
```

create `script` in `package.json`:

```json
"scripts": {
  "dev": "next dev"
}
```

run: 

```
yarn dev
```

### Um desafio importante

create `.gitignore`:

```
node_modules
.next
```

add `script`:

```json
"scripts": {
  "start": "next start"
}
```

```
git add .
git commit -M "next app"
git push origin main
```