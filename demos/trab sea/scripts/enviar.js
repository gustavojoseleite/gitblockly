Blockly.defineBlocksWithJsonArray([
{
  "type": "enviar",
  "message0": "enviar %1 %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "NAME",
      "options": [
        [
          "-a",
          "-a"
        ],
        [
          "-m",
          "-m"
        ]
      ]
    },
    {
      "type": "input_statement",
      "name": "path",
      "check": "comentario"
    }
  ],
  "colour": 195,
  "tooltip": "Torna as mudanças salvas no 'Index' em mudanças permanentes e salva o seu estado! A opção '-a' faz com que o commit verifique se houve alguma modificação nos arquivos já existentes (Não verifica se há algum novo!), adiciona ao 'Index' e realiza o commit normal enquanto a opção '-m' permite adicionar um rótulo para a alteração feita.",
  "helpUrl": ""
}
]);

Blockly.JavaScript['enviar'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  var subString = Blockly.JavaScript.valueToCode(block, 'path', Blockly.JavaScript.ORDER_ADDITION) || '0';
  //var statements_path = Blockly.JavaScript.statementToCode(block, 'path');

  subString = subString.replace(';','');
  if(dropdown_name=="-a" && subString==0){
    var code = "git commit " + dropdown_name; // " " + dropdown_tipo_entrada + " " + subString;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
  else if (dropdown_name=="-a" && subString!=0){
  	var code = "A opção '-a' não necessita de um parâmetro"
  	return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }

  if(dropdown_name=="-m" && subString==0){
  	var code = "A opção '-m' necessita de um bloco de comentário"
  	return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
  else if (dropdown_name=="-m" && subString!=0){
    var code = "git commit " + dropdown_name + " \"" + subString + "\""; // " " + dropdown_tipo_entrada + " " + subString;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
};

Blockly.defineBlocksWithJsonArray([
{
  "type": "comentario",
  "message0": "%1",
  "args0": [
    {
      "type": "field_input",
      "name": "comentário",
      "text": "comentário"
    }
  ],
  "previousStatement": null,
  "colour": 195,
  "tooltip": "Comentário rotulado a alteração feita no repositório",
  "helpUrl": ""
}
]);

Blockly.JavaScript['comentario'] = function(block) {
  var code = block.getFieldValue('comentário') + ";";
 
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};