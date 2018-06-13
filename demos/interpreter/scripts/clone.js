Blockly.defineBlocksWithJsonArray([
{
  "type": "clone",
  "message0": "clone %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TEXT",
      "check": "String"
    }
  ],
  "inputsInline": false,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}
]);

Blockly.JavaScript['clone'] = function(block) {
  //var value = block.getFieldValue('VALUE');
  var subString = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ADDITION) || '0'
  //return "clone " +(Blockly.JavaScript.valueToCode(a,"TEXT",Blockly.JavaScript.ORDER_NONE)||"''")+");\n";
  return 'clone '+ subString;
};