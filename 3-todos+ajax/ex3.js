/* Pega elemento botão */
var btn = document.querySelector('button#btn');
var ul = document.querySelector('ul#ul');
var p = document.createElement('p');

/*Função da Promise */
var myPromise = function(){
	return new Promise(function (resolve, reject){
		/* Pega valor do elemento texto */
		var usr = document.querySelector('input#input').value;
		
		/* Requisição HTTP (Ajax - jquery) */
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://api.github.com/users/' + usr + '/repos');
		xhr.send('null');

		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4) {
                if (xhr.status === 200){
                	resolve(JSON.parse(xhr.responseText));                    
                } else {
					reject(xhr.status);  
                }
            }
        }
	});
}

btn.onclick = function(){
	myPromise()
		.then(function(response){
			for (rep of response){
				li = document.createElement('li');
				li.innerHTML = 'Carregando...';
				ul.appendChild(li);
				li.innerHTML = 'id' + '(' + rep.id + '): ' + rep.name;
				ul.appendChild(li);
			};			
		})
		.catch(function(error){
			p.innerHTML = 'Erro ' + error + ': Usuário não encontrado';
			document.body.appendChild(p);
		});
}