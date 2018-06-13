Blockly.defineBlocksWithJsonArray([
{
  "type": "adicionar",
  "message0": "adicionar %1",
  "args0": [
    {
      "type": "input_value",
      "name": "path",
      "check":"arq"
    }
  ],
  "inputsInline": false,
  "colour": 135,
  "tooltip": "Adiciona arquivo no repositório - Parâmetro de entrada: nome do arquivo",
  "helpUrl": ""
}
]);

Blockly.JavaScript['adicionar'] = function(block) {
  var subString = Blockly.JavaScript.valueToCode(block,"path", Blockly.JavaScript.ORDER_ADDITION) || '0'
  if(subString==0){
    return "O bloco 'adicionar' necessita de parâmetros.";
  }
  else{
    var code = "git add " + subString;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
};