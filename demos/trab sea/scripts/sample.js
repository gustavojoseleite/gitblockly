//LangCode for the first block
Blockly.Blocks['sample'] = {
  init: function() {
    this.appendValueInput("A2")
        .setCheck("String")
        .appendField(new Blockly.FieldTextInput("Yumi Echo "), "A3");
    this.setInputsInline(false);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['sample'] = function(block) {
 var text_a3 = block.getFieldValue('A3');
 var value_a2 = Blockly.JavaScript.valueToCode(block, 'A2', Blockly.JavaScript.ORDER_ATOMIC);
 var code = text_a3+value_a2;
 return [code, Blockly.JavaScript.ORDER_ATOMIC];
 
};