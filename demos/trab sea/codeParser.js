	function checkComand(codeLines, comand){
		var existComand = false;
		var pos = [];
		
		var i;
		
		//debugger;
		for (i = 0; i < codeLines.length; i++) {
			
			if (codeLines[i].search(comand)>=0) {
				pos.push(i);
			}
		}
		return(pos)
	}
	
	function checkConfig(codeLine) {
	
	var aux = -1;
	
	var r = ''
			
	//debugger;		
			
	aux = codeLine.search("user.name");
	if(aux >= 0){

		stats.userName = codeLine.substring(aux+10);
		r = r+"#Username = "+stats.userName+"\n";
		
	}
	else{
		aux = codeLine.search("user.email");
		if(aux >= 0){
	
			stats.userEmail = codeLine.substring(aux+11);	
			r = r+"#User Email = "+stats.userEmail+"\n";

		}
	}
	
	return (r);
	}
	
	function checkInit(codeLine) {
	var existInit = false;
	var existInit2OrMore = false;

	var aux = -1;
	var r = '';

	aux = codeLine.search("git init");
	if(aux >= 0){
		if(stats.isInit){
			r = r +"#!Aviso! O diretório já foi iniciado!(comando 'git init' dado mais de uma vez ou após um 'git clone')\n"
			existInit2OrMore = true;
		}
		else{
			r = r+ "#Diretório:"+stats.curDir+" iniciado!\n";
			existInit = true;
		}
	}
		
	stats.isInit = (existInit && !(existInit2OrMore));
	
	return(r);
	}
	
	function checkClone(codeLine) {
	var existClone = false;
	var existClone2OrMore = false;
	var repRemoto = '';
	
	var aux = -1;
	var r = '';
	//debugger;

	aux = codeLine.search("git clone");
	if(aux >= 0){
		if(stats.isInit){
			r = r +"#!Aviso! O diretório já foi clonado!(comando 'git clone' dado mais de uma vez ou após um 'git init')\n"
			existClone2OrMore = true;
			existClone = true;
			repRemoto = '';
		}
		else{
			existClone = true;
			repRemoto = codeLine.substring(aux+10);
		}
	}
		
		stats.isInit = (existClone)?(existClone && !(existClone2OrMore)):stats.isInit;
		stats.repRemoto = repRemoto;
		
		return(r);
	}
		
	function checkAdd(codeLine) {
	
	var files;
	var aux = -1;
	
	
	var j;
	
	var r = '';
	
	var idx;
	//debugger;

	
	aux = codeLine.search("git add");
	if(aux >= 0){
		files = codeLine.split(' ');
		if(files.length>2){
			for(j = 2; j<files.length;j++){
				
				
				//Verifica se já indexado e preparado:
				idx = stats.index.findIndex((elem) => {
				return(files[j] === elem.filename);
				});
				
				if(idx > -1){
					if(stats.index[idx].staged == true){
						r = r+ "#!Arquivo: "+files[j]+" Já foi adicionado! (Comando git add repetido!)\n";
					}
					else{
						stats.index[idx].staged = true;
						r = r+ "#Arquivo: "+files[j]+" Preparado para ser salvo!\n";
					}
				}
				else{
					//------
					//Verifica se existe o arquivo...
					//-------
					
					idx = -1;
					
					idx = stats.files.findIndex((elem) => {
					return(files[j] === elem.filename);
					});
				
					//E o adiciona ao index...
					if( idx > -1){
						//stats.files.splice(idx,1);
						stats.index.push({filename: files[j], modified: true, staged: true});
						r = r+ "#Arquivo: "+files[j]+" Adicionado ao Index e preparado para ser salvo!\n";
					}else{
						r = r+ "#!Arquivo: "+files[j]+" Não encontrado\n";
					}
	
					
					
					
				}
				
			}
		}
		else{
			r = r+"#!Indique um arquivo válido no git add!\n";
		}
	}
		
	return(r);
	}

	function checkCommit(codeLine){
		var i;
		
		var itsA = false;
		var itsM = false;
		var hasM = false;
		var comment = '#Comentário Salvo:';
		var r = '';
		
		
		var param = codeLine.split(' ');
		
		if(param.length > 2){
			//'git commit -a'
			//'git commit -m'
			for(i = 2; i<param.length;i++){
			
				switch(param[i]){
					case '-a':
						itsA = true;
						break;
					
					case '-m':
						itsM = true;
						break;
					
					default:
						if(itsM){
								comment = comment +" "+ param[i];
								if(param[i][param[i].length-1] == '"'){
									itsM = false;
								}
								else{
									comment = comment +" ";
								}
							}
						hasM = true;
						break;
				}
				
				
			}
		}
		
		if(itsA){
			for(i = 0; i<stats.index.length; i++){
				if (stats.index[i].modified == true && stats.index[i].staged == false){
					stats.index[i].staged = false;
					stats.index[i].modified = false;
					r = r + "#Arquivo: "+stats.index[i].filename+" Indexado e Salvo!\n";
				}else if(stats.index[i].modified == true && stats.index[i].staged == true){
					stats.index[i].staged = false;
					stats.index[i].modified = false;
					r = r + "#Arquivo: "+stats.index[i].filename+" Salvo!\n";
				}
				else if(stats.index[i].modified == false && stats.index[i].staged == true){
					stats.index[i].staged = false;
					stats.index[i].modified = false;
					r = r + "#Arquivo: "+stats.index[i].filename+" Arquivo já atualizado!\n";
				}
			}
		}
		else{//'git commit ou git commit -m'
			for(i = 0; i<stats.index.length; i++){
				if(stats.index[i].modified == true && stats.index[i].staged == true){
					stats.index[i].staged = false;
					stats.index[i].modified = false;
					r = r + "#Arquivo: "+stats.index[i].filename+" Salvo!\n";
				}
				else if(stats.index[i].modified == false && stats.index[i].staged == true){
					stats.index[i].staged = false;
					stats.index[i].modified = false;
					r = r + "#Arquivo: "+stats.index[i].filename+" Arquivo já atualizado!\n";
				}
			}
			
		}
	
	if(stats.index.length < 1){
		comment = '';
		r = r+"#!Nenhum arquivo salvo, o Index está vazio! (Dica: Tente usar -a, ou adicionar arquivos ao index usando git add)\n";
	} else if(!hasM){
		comment = comment +'#Na realidade, o Git abriria um editor para que seja adicionado um comentário. (Dica: É mais fácil usar git commit -m "Comentário")\n';
	}
			
	return(r+comment);
	}

	function checkModify(codeLine){
	var files;
	var aux = -1;
	
	
	var j;
	
	var r = '';
	
	var idx;
	//debugger;

	
	aux = codeLine.search("#Modificado:");
	if(aux >= 0){
		files = codeLine.split(' ');
		if(files.length>1){
			for(j = 1; j<files.length;j++){
			
				//Verifica se já indexado e preparado:
				idx = stats.index.findIndex((elem) => {
				return(files[j] === elem.filename);
				});
				
				if(idx > -1){
					if(stats.index[idx].staged == true){
						r = r+ "#!Cuidado, Faça um novo git add!!! Arquivo: "+files[j]+" Já tinha sido preparado por um git add, no mundo real apenas as modificações feitas até aquele git add seriam salvas com um git commit! Arquivo retirado não preparado para salvar\n";
						stats.index[idx].modified = true;
						stats.index[idx].staged = false;
					}
					else{
						stats.index[idx].modified = true;
						r = r+ "#Arquivo: "+files[j]+" Modificado!\n";
					}
				}
				else{
					//------
					//Verifica se existe o arquivo...
					//-------
					
					idx = -1;
					
					idx = stats.files.findIndex((elem) => {
					return(files[j] === elem.filename);
					});
				
					if( idx < 0){
						r = r+ "#!Arquivo: "+files[j]+" Não Existe!\n";
					}else{
						r = r+ "#Arquivo: "+files[j]+" Modificado!\n";
					}
				}
			}
				
		}else{
			r = r+"#!Escolha ao um arquivo para ser modificado!\n";
		}
	}
	
	return(r);
	}
	
	function checkCreate(codeLine){
	
	var files;
	var aux = -1;
	
	
	var j;
	
	var r = '';
	
	var idx;
	//debugger;

	
	aux = codeLine.search("#Criado:");
	if(aux >= 0){
		files = codeLine.split(' ');
		if(files.length>1){
			for(j = 1; j<files.length;j++){
				//Verifica se já existe
				
				idx = -1;
				
				idx = stats.files.findIndex((elem) => {
				return(files[j] === elem.filename);
				});
				//E o adiciona ao index...
				if( idx > -1){
					r = r+ "#!Arquivo: "+files[j]+" já existe\n";
					
				}else{
					stats.files.push({filename: files[j]});
					r = r+ "#Arquivo: "+files[j]+" Criado!\n";
					
				}
			}
				
		}else{
			r = r+"#!Escolha um nome para Criar o Arquivo!\n";
		}
	}
	
	
		
	return(r);
	}
	
	function parseCode(code){
		var lines = code.split('\n');
		var i;
		var j;
		var msg = '';
		
		//debugger;
		
		
		for (i = 0; i<lines.length; i++){
			var command = lines[i].split(' ');
			msg = msg + lines[i] +'\n'
			if 		(command[0].search('git')>=0) {
				switch(command[1]){
					case "config":
						msg = msg + checkConfig(lines[i]);
						break;
						
					case "init":
						msg = msg + checkInit(lines[i]);
						break;
						
					case "clone":
						msg = msg + checkClone(lines[i]);
						break;
						
					case "add":
						msg = msg + checkAdd(lines[i]);
						break;
						
					case "commit":
						msg = msg + checkCommit(lines[i]);
						break;
				}
			}
			else  if(command[0].search('#Modificado:')>=0){
				msg = msg+checkModify(lines[i]);
			}
			else  if(command[0].search('#Criado:')>=0){
				msg = msg+checkCreate(lines[i]);
			}
			else{
				//debugger;
				if(lines[i].length>0)
					msg = msg+'#!'+lines[i]+'\n';
			}
			
		}
		
		return(msg);
		
		
		
	}
	
	function parseMsgToHtml(msgSent){
		var lines = msgSent.split('\n');
		var i;
		var j;
		
		var end = false;
		
		var startCommandSpan = '<span style="display: inline-block; color: BlueViolet">';
		
		var startAttributesSpan = '<span style="display: inline-block; color: Black">';
		
		var startCommentSpan = '<span style="display: inline-block; color: Green">';
		
		var startWarningSpan = '<span style="display: inline-block; color: Red">';
		
		var endSpan = '</span>';
		
		//debugger;		
		
		for (i = 0; i<lines.length; i++){
			var command = lines[i].split(' ');
			//msg = msg + lines[i] +'\n'
			if  (command[0].search('git')>=0) {
			
				msg = msg + startCommandSpan + command[0] +' '+ command[1]+endSpan+' ';		
				msg = msg + startAttributesSpan;
				for(j = 2; j<command.length;j++){
					msg = msg +' '+ command[j];
				}
				msg = msg + endSpan+'\n';
			}
			else  if(command[0].search('#!')>=0){
				msg = msg + startWarningSpan+'#'+lines[i].slice(2) + endSpan+'\n';
			}
			else  if(command[0].search('#')>=0){
				msg = msg + startCommentSpan+ lines[i] + endSpan+'\n';
			}
			else if(!end){//Garante que so é escrito 1 vez
					end = true;
					
			}
		
			//msg = msg +'\n'
		}
		
		msg = msg +'<span style="display: inline-block; color: Blue">'+"\t#Fim do Programa"+endSpan+'\n';
		return(msg);	
	}
	
	function showStats(){

		var div0 = document.getElementById('statsDiv0');
		var div1 = document.getElementById('statsDiv1');
		var div2 = document.getElementById('statsDiv2');
		var div3 = document.getElementById('statsDiv3');
		var div4 = document.getElementById('statsDiv4');
		var div5 = document.getElementById('statsDiv5');
		var div6 = document.getElementById('statsDiv6');
		var div7 = document.getElementById('statsDiv7');
		
		var varSpan = '<span style="display: inline-block; color: green">';
		
		div0.innerHTML = 'Dir: '+varSpan+stats.curDir+'</span>';
		div1.innerHTML = 'Username: '+varSpan+stats.userName+'</span>';
		div2.innerHTML = 'User Email: '+varSpan+stats.userEmail+'</span>';
		div3.innerHTML = 'Rep. Iniciado: '+varSpan+((stats.isInit)?'Sim':'Não')+'</span>';
		div4.innerHTML = 'Rep. Remoto: '+varSpan+stats.repRemoto+'</span>';
		
		
		var spanIndex = '';
		var i;
		for(i = 0; i < stats.index.length;i++){
			spanIndex = spanIndex +varSpan+'\t'+(i+1)+'. '+ stats.index[i].filename + ' - Modificado? ' + ((stats.files[i].modified)?'Sim':'Não') +'</span>';
		}
		
		div5.innerHTML = 'Index: '+	spanIndex;
		
		var spanFile = '';
		var i;
		for(i = 0; i < stats.files.length;i++){
			spanFile = spanFile +varSpan+'\t'+(i+1)+'. '+ stats.files[i].filename +'</span>';
		}
		
		div6.innerHTML = 'Arquivos: '+	spanFile;
	}
	
    function zerarTudo(){
	
	//debugger;
	
	stats.curDir = '/home';
	stats.isInit = false;
	stats.userName = 'Nda';
	stats.userEmail = 'Nda';
	stats.branch = 'Nda';
	stats.repRemoto = 'Nda';
	stats.index = [];
	stats.files = [];
	stats.valid = false;
	
	var saida = document.getElementById('output');
	while (saida.firstChild) saida.removeChild(saida.firstChild);
	msg = '';
	
	showStats();
	}
	