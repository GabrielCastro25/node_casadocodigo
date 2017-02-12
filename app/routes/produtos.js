
module.exports = function(app){
	var listaProdutos = function(req,res){
    	var connection = app.infra.connectionFactory();
    	var produtosDAO = new app.infra.ProdutosDAO(connection);

    	produtosDAO.lista(function(err,results){
    		res.format({
    			html: function(){
                    res.render('produtos/lista', {lista:results});
                },
                json: function(){
                    res.json(results);
                }
    		})
            
        });

        connection.end();
    }

    app.get('/produtos', listaProdutos);

    app.get('/produtos/form', function(req,res){
    	res.render('produtos/form', {errosValidacao:{}, produto: {}});
    });


    function validarCamposObrigatorios(produto, req, res) {
    	req.assert('titulo','Título é obrigatório').notEmpty();

		req.assert('preco','Formato inválido').isFloat();

		var erros = req.validationErrors();
		if (erros){
    		res.format({
                html: function(){
                    res.status(400).render("produtos/form",{validationErrors:errors,produto:produto});
                },
                json: function(){
                    res.status(400).send(errors);
                }
            });
   			return;
		}
    }

    app.post('/produtos', function(req,res){
    	var produto = req.body;

    	validarCamposObrigatorios(produto, req, res);

    	var connection = app.infra.connectionFactory();
    	var produtosDAO = new app.infra.ProdutosDAO(connection);

    	produtosDAO.salva(produto, function(err, results) {
    		res.redirect('/produtos');
    	});

    	connection.end();

    });
}