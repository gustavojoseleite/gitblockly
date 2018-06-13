Blockly.defineBlocksWithJsonArray([
{
  "type": "repo",
  "lastDummyAlign0": "CENTRE",
  "message0": "%1",
  "args0": [
    {
      "type": "field_input",
      "name": "repo",
      "text": "endereco_repositório"
    }
  ],
  "output": "repo",
  "colour": 230,
  "tooltip": "Contém o endereço do repositório",
  "helpUrl": ""
}

]);

Blockly.JavaScript['repo'] = function(block) {
  var code = block.getFieldValue('repo');

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.defineBlocksWithJsonArray([
{
  "type": "nome_repo",
  "lastDummyAlign0": "CENTRE",
  "message0": "%1",
  "args0": [
    {
      "type": "field_input",
      "name": "nome_repo",
      "text": "nome_repositório"
    }
  ],
  "output": "nome_repo",
  "colour": 10,
  "tooltip": "",
  "helpUrl": ""
}

]);

Blockly.JavaScript['nome_repo'] = function(block) {
  var code = block.getFieldValue('nome_repo');
  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};