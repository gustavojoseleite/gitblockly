Blockly.defineBlocksWithJsonArray([
{
  "type": "arq",
  "message0": "%1",
  "args0": [
    {
      "type": "field_input",
      "name": "arq",
      "text": "nome_arquivo"
    }
  ],
  "inputsInline": false,
  "output": "arq",
  "colour": 135,
  "tooltip": "",
  "helpUrl": ""
}

]);

Blockly.JavaScript['arq'] = function(block) {
    code = block.getFieldValue('arq');

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
