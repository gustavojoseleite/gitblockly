Blockly.defineBlocksWithJsonArray([
{
  "type": "clonar",
  "message0": "clonar %1",
  "args0": [
    {
      "type": "input_value",
      "name": "path",
      "check": "repo"
    }
  ],
  "inputsInline": false,
  "colour": 230,
  "tooltip": "Faz uma cópia do repositório desejado - Parâmetro de entrada: endereço do repositório",
  "helpUrl": ""
}
]);

Blockly.JavaScript['clonar'] = function(block) {
  var subString = Blockly.JavaScript.valueToCode(block, "path", Blockly.JavaScript.ORDER_ADDITION) || '0';
  if(subString==0){
    return "O bloco 'clonar' necessita de parâmetros.";
  }
  else{
    var code = "git clone " + subString;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
};