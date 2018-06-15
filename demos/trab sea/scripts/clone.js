Blockly.defineBlocksWithJsonArray([
{
  "type": "clone",
  "message0": "clone %1 %2",
  "args0": [
    {
      "type": "field_input",
      "name": "NAME",
      "text": "url/repositório"
    },
    {
      "type": "input_statement",
      "name": "path",
      "check": "endereço_repositório"
    }
  ],
  "colour": 230,
  "tooltip": "Cria um repositório e nele salva os conteúdos copiados de um outro repositório ou endereço URL",
  "helpUrl": ""
}
]);

Blockly.JavaScript['clone'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var subString = Blockly.JavaScript.valueToCode(block, "path", Blockly.JavaScript.ORDER_ADDITION) || '0';
  //var statements_path = Blockly.JavaScript.statementToCode(block, 'path');
  subString = subString.replace(';','');
  if(subString==0){
    var code = "git clone " + text_name;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
  else{
    var code = "git clone " + text_name + " " + subString;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
};

Blockly.defineBlocksWithJsonArray([
{
  "type": "endereço_repositório",
  "message0": "%1",
  "args0": [
    {
      "type": "field_input",
      "name": "endereço_repositório",
      "text": "endereço_destino"
    }
  ],
  "previousStatement": null,
  "colour": 230,
  "tooltip": "Endereço de destino de um repositório a ser clonado",
  "helpUrl": ""
}
]);

Blockly.JavaScript['endereço_repositório'] = function(block) {
  var code = block.getFieldValue('endereço_repositório') + ";";

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
  
};