import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import BancoMysql from './db/banco-mysql'
import BancoMongo from './db/banco-mongo'

const app = express()
app.use(express.json())
app.use(cors())


app.get("/produtos", async (req, res) => {
    try {
        const banco = new BancoMysql()
        await banco.criarConexao()
        const result = await banco.listar()
        await banco.finalizarConexao()
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send("Server ERROR")
    }
})
app.get("/usuarios", async (req, res) => {
    try {
        const banco = new BancoMysql()
        await banco.criarConexao()
        const result = await banco.listarusuarios()
        await banco.finalizarConexao()
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send("Server ERROR")
    }
})



app.get("/produtos/:id", async (req, res) => {
    try {
        
        const banco = new BancoMysql()
        await banco.criarConexao()
        const result = await banco.listarPorId(req.params.id)
        await banco.finalizarConexao()
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send("Server ERROR")
    }
})
app.get("/usuarios/:id", async (req, res) => {
    try {
        
        const banco = new BancoMysql()
        await banco.criarConexao()
        const result = await banco.listarPorId(req.params.id)
        await banco.finalizarConexao()
        res.send(result)
    } catch (e) {
        console.log(e)
        res.status(500).send("Server ERROR")
    }
})

app.post("/produtos", async (req, res) => {
    try {
        const { nome, marca, tamanhotela, resolucaotela, proporcaotela, frequenciatela, imagem } = req.body;

        // Criando o objeto sem o id, já que ele será gerado automaticamente pelo banco
        const produto = { nome, marca, tamanhotela, resolucaotela, proporcaotela, frequenciatela, imagem };
        
        const banco = new BancoMysql();
        await banco.criarConexao();

        // Inserindo o produto sem o id
        const result = await banco.inserir(produto);

        await banco.finalizarConexao();
        res.send(result); // Retorne o resultado da inserção

    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

app.post("/usuarios", async (req, res) => {
    try {
        const { nome, marca, tamanhotela, resolucaotela, proporcaotela, frequenciatela, imagem } = req.body;

        // Criando o objeto sem o id, já que ele será gerado automaticamente pelo banco
        const produto = { nome, marca, tamanhotela, resolucaotela, proporcaotela, frequenciatela, imagem };
        
        const banco = new BancoMysql();
        await banco.criarConexao();

        // Inserindo o produto sem o id
        const result = await banco.inserir(produto);

        await banco.finalizarConexao();
        res.send(result); // Retorne o resultado da inserção

    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

//DELETAR
app.delete("/usuarios/:id",async(req,res)=>{
    try{
        const banco = new BancoMysql()
        await banco.criarConexao()
        const result = await banco.excluirusuario(req.params.id)
        await banco.finalizarConexao()
        res.status(200).send("Usuário excluido com sucesso id: "+req.params.id)
    }
    catch(e){
        console.log(e)
        res.status(500).send("Erro ao excluir")
    }
    
})

app.put("/usuarios/:id",async(req,res)=>{
    const {nome,email,senha,datanascimento,telefone} = req.body
    const usuario = {nome,email,senha,datanascimento,telefone}
    const banco = new BancoMysql()
    await banco.criarConexao()
    const result = await banco.alterarusuario(req.params.id,usuario)
    await banco.finalizarConexao()
    res.status(200).send("Usuário alterado com sucesso id: "+req.params.id)
})

//ALTERAR
app.put("/produtos/:id",async(req,res)=>{
    const {nome,marca,tamanhotela,resolucaotela,proporcaotela,frequenciatela,imagem} = req.body
    const produto = {nome,marca,tamanhotela,resolucaotela,proporcaotela,frequenciatela,imagem}
    const banco = new BancoMysql()
    await banco.criarConexao()
    const result = await banco.alterar(req.params.id,produto)
    await banco.finalizarConexao()
    res.status(200).send("Produto alterado com sucesso id: "+req.params.id)
})

app.listen(8000, () => {
    console.log("Iniciei o servidor")
})