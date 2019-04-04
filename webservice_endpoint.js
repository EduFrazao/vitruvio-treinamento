/*
 * Template Endpoint WebService via Script
 * */
function WebService() {
    var db = libService.loadScript('db');
    var superus = new db('superus_producao');

    this.onGet = function(params, request, response) {
        var nome = params.query.nome;
	    var limit = (params.query.limit) ? params.query.limit : 10;

        var sql = 'select CODIGO, NOME, CPF, CNPJ from pessoas where LOWER(nome) like LOWER(:nome) AND ROWNUM <= :limit';
        var paramSQL = {
            nome: "%"+nome+"%",
            limit: limit
        };
        var retorno = [];
        superus.query(sql, paramSQL).each(function(row, index) {
            var linha = {
                codigo: row.codigo,
                nome: row.nome,
                documento: (row.cpf) ? row.cpf : row.cnpj
            };
            retorno.push(linha);
        });
        return JSON.stringify(retorno);
    }
    
    this.onPost = function(params, request, response) {
        var dados = JSON.parse(params.requestBody);
        //CREATE SEQUENCE TREINAMENTO_WEBSERVICE_1_SEQ;
        //SELECT * FROM TREINAMENTO_WEBSERVICE_1;

        if(dados.codigo) {
            var update = "UPDATE TREINAMENTO_WEBSERVICE_1 SET NOME = :nome, TELEFONE = :telefone " +
            " WHERE CODIGO = :codigo";
            superus.update(update, dados);
            
            return null;
        } else {
            var id = superus.getSequenceNextVal('TREINAMENTO_WEBSERVICE_1_SEQ');
            dados.codigo = id;
            var insert = "INSERT INTO TREINAMENTO_WEBSERVICE_1 (codigo, nome, telefone) " + 
            " VALUES (:codigo, :nome, :telefone)"
            superus.update(insert, dados);
            return JSON.stringify({entityId: id});
        }
        
    }
    
}

module.exports = new WebService();
