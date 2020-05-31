/* Pega elemento botão */
var btn = document.querySelector('button#btn');

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
					reject('Erro na requisição');  
                }
            }
        }
	});
}

btn.onclick = function(){
	myPromise()
		.then(function(response){
			var ul = document.querySelector('ul#ul')
			for (rep of response){
				var li = document.createElement('li');
				li.innerHTML = 'id' + '(' + rep.id + '): ' + rep.name;
				ul.appendChild(li);
			};			
		})
		.catch(function(error){
			console.warn(error)
		});
}