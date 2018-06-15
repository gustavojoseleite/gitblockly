Blockly.defineBlocksWithJsonArray([
{
  "type": "initi",
  "message0": "init %1",
  "args0": [
    {
      "type": "input_value",
      "name": "path",
      "check": "diretório"
    }
  ],
  "inputsInline": false,
  "colour": 10,
  "tooltip": "O init faz com que o diretório seja preparado para ser gerenciado pelo git!",
  "helpUrl": ""
}
]);

Blockly.JavaScript['initi'] = function(block) {
  var subString = Blockly.JavaScript.valueToCode(block, "path", Blockly.JavaScript.ORDER_ADDITION) || '0';
  if(subString==0){
    return "O bloco 'init' necessita de parâmetros.";
  }
  else{
    var code = "git init " + subString;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
};

Blockly.defineBlocksWithJsonArray([
{
  "type": "diretório",
  "lastDummyAlign0": "CENTRE",
  "message0": "%1",
  "args0": [
    {
      "type": "field_input",
      "name": "diretório",
      "text": "diretório"
    }
  ],
  "output": "diretório",
  "colour": 10,
  "tooltip": "Utilize '.' para o diretório atual ou informe o caminho do diretório desejado",
  "helpUrl": ""
}

]);

Blockly.JavaScript['diretório'] = function(block) {
  var code = block.getFieldValue('diretório');
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};