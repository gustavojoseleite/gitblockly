Blockly.defineBlocksWithJsonArray([
{
  "type": "init",
  "message0": "init %1",
  "args0": [
    {
      "type": "input_value",
      "name": "path",
      "check": "String"
    }
  ],
  "inputsInline": false,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}
]);

Blockly.JavaScript['init'] = function(block) {
  var value = block.getFieldValue('path');
  return 'init';
};