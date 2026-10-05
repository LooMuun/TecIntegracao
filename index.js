const express = require('express');
const rotaFornecedor = require('./routes/rotaFornecedor'); // Importa as rotas

const app = express();

app.use(express.json()); 

app.use(rotaFornecedor);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});