Blockly.defineBlocksWithJsonArray([
{
  "type": "inicializar",
  "message0": "inicializar %1",
  "args0": [
    {
      "type": "input_value",
      "name": "path",
      "check": "nome_repo"
    }
  ],
  "inputsInline": false,
  "colour": 10,
  "tooltip": "Inicializa um novo repositório - Deve ser especificado o nome do repositório",
  "helpUrl": ""
}
]);

Blockly.JavaScript['inicializar'] = function(block) {
  var subString = Blockly.JavaScript.valueToCode(block, "path", Blockly.JavaScript.ORDER_ADDITION) || '0';
  if(subString==0){
    return "O bloco 'inicializar' necessita de parâmetros.";
  }
  else{
    var code = "git init " + subString;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
};