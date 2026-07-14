# dashboard_investimentos

Dashboard simples de carteira de investimentos. Acompanha a variação da taxa Selic e simula, com juros compostos e liquidez diária, quanto um valor investido renderia ao longo dos últimos 12 meses.

## Funcionalidades

- **Variação da Selic (meta)** — gráfico de linha com os pontos em que o Copom mudou a taxa nos últimos 12 meses.
- **Simulador de investimento** — você informa um valor investido e o app calcula a evolução mês a mês, aplicando a taxa Selic diária (série histórica) com juros compostos (liquidez diária).

## Fontes de dados

Os dados vêm em tempo real da API pública do Banco Central do Brasil (SGS — Sistema Gerenciador de Séries Temporais), sem necessidade de chave/token:

- Série 432 — Meta Selic definida pelo Copom
- Série 11 — Taxa Selic diária

## Tecnologias

- [React](https://react.dev) + [Vite](https://vite.dev)
- [Recharts](https://recharts.org) para os gráficos

## Como rodar o projeto

Pré-requisito: ter o [Node.js](https://nodejs.org) instalado (versão 18 ou superior).

1. Clone o repositório e entre na pasta:
   ```
   git clone <url-do-repositorio>
   cd dashboard_investimentos
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Rode o servidor de desenvolvimento:
   ```
   npm run dev
   ```

4. Abra o endereço mostrado no terminal (geralmente [http://localhost:5173](http://localhost:5173)) no navegador.

## Como usar

1. Aguarde o carregamento do gráfico de variação da Selic.
2. No campo "Total investido", digite um valor (ex: `1000,00`).
3. Clique em "Simular" para ver o gráfico de evolução do montante ao longo dos últimos 12 meses.
