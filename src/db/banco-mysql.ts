import mysql , { Connection, RowDataPacket } from 'mysql2/promise'
class BancoMysql{
    //Atributos de uma classe
    connection:Connection|null = null
    
    //Métodos
    async criarConexao(){
        this.connection = await mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "",
            database: process.env.dbname ? process.env.dbname : "banco1022a",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        })
    }
    async consultar(query:string,params?:any[]){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query(query,params)
        return result
    }
    async finalizarConexao(){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        await this.connection.end()
    }
    async listar(){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("SELECT * FROM produtos")
        return result
    }
    async listarusuarios(){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("SELECT * FROM usuarios")
        return result
    }

    async inserir(produto: { nome: string; marca: string; tamanhotela: string; resolucaotela: string; proporcaotela: string; frequenciatela: string; imagem: string }) {
        if (!this.connection) throw new Error("Erro de conexão com o banco de dados.");
    
        // Inserção sem o id, já que o banco irá gerar automaticamente
        const [result] = await this.connection.query(
            "INSERT INTO produtos (nome, marca, tamanhotela, resolucaotela, proporcaotela, frequenciatela, imagem) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [produto.nome, produto.marca, produto.tamanhotela, produto.resolucaotela, produto.proporcaotela, produto.frequenciatela, produto.imagem]
        );
        return result;
    }
    async inserirusuario(usuario: { nome: string; email: string; senha: string; confirmarsenha: string; datanascimento: string; telefone: string; endereco: string }) {
        if (!this.connection) throw new Error("Erro de conexão com o banco de dados.");
    
        // Inserção sem o id, já que o banco irá gerar automaticamente
        const [result] = await this.connection.query(
            "INSERT INTO usuarios (nome, email, senha, confirmarsenha, datanascimento, telefone, endereco) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [usuario.nome, usuario.email, usuario.senha, usuario.confirmarsenha, usuario.datanascimento, usuario.telefone, usuario.endereco]
        );
        return result;
    }
    
    async excluir(id:string){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("DELETE FROM produtos WHERE id = ?",[id])
        return result
    }
    async excluirusuario(id:string){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("DELETE FROM usuarios WHERE id = ?",[id])
        return result
    }
    async alterar(id:string,produto:{id?:string,nome:string,marca:string,tamanhotela:string,resolucaotela:string,proporcaotela:string,frequenciatela:string,imagem:string}){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("UPDATE produtos SET nome=?,marca=?,tamanhotela=?,resolucaotela=?,proporcaotela=?,frequenciatela=?,imagem=? WHERE id=?",
        [produto.nome,produto.marca,produto.tamanhotela,produto.resolucaotela,produto.proporcaotela,produto.frequenciatela,produto.imagem,id])
        return result
    }
    async alterarusuario(id:string,usuario:{id?:string,nome:string,email:string,senha:string,datanascimento:string,telefone:string}){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("UPDATE usuarios SET nome=?,email=?,senha=?,datanascimento=?,telefone=? WHERE id=?",
        [usuario.nome,usuario.email,usuario.senha,usuario.datanascimento,usuario.telefone,id])
        return result
    }
    async listarPorId(id:string){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("SELECT * FROM produtos WHERE id = ?",[id]) as RowDataPacket[]
        return result[0]
    }
    async listarPorIdusuarios(id:string){
        if(!this.connection) throw new Error("Erro de conexão com o banco de dados.")
        const [result, fields] = await this.connection.query("SELECT * FROM usuarios WHERE id = ?",[id]) as RowDataPacket[]
        return result[0]
    }
}

export default BancoMysql