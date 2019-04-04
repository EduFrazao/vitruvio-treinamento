// Carregando cliente HTTP
var httpClient = libService.loadScript('httputil');

// Determinando que o cliente http aceite certificados auto assinados ou sem entidade certificadora valida
httpClient.setTrustAllHttpsCertificates(true);

// Opcoes customizadas do cliente http (Header token)
var options = {
    headers: [
        {name: "Accept", value: "application/json"},
        {name: "X-WS-TOKEN-AUTH", value: "eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXJTeXN0ZW0iOiJWaXRydXZpb0R5bmFtaWNFbmRwb2ludF8yLjEuMS1yYzEuamF2YTgiLCJpYXQiOjE1NTQ0MDY0Njl9.-lHlCWEQZHBypDJ1fRbaOtx78fisxidrfu3X8B7AyFc"}
    ]
};

// Objeto de dados, vamos enviar via post
var dados = {
    nome: "eduardo",
    telefone: null
};

// Criando String Request Body
var entity = httpClient.createStringEntity(JSON.stringify(dados), 'application/json', 'utf-8');

// Endpoint do WebService
var endpoint = "http://10.0.210.82/vitruvio/rest/api/integration/tokenauth/treinamento_eduardo_endpoint";

// Coletando resultado
var result = httpClient.postForString(endpoint, entity, options);

// Exibindo conteudo
engine.debug(result.content);

// Exemplo de chamada para Get
httpClient.getForString(endpoint, 'application/json');