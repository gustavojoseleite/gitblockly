Blockly.Blocks['repo'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_CENTRE)
        .appendField("repositorio");
    this.appendValueInput("REPO")
    this.setOutput(true, null);
    this.setColour(135);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['repo'] = function(block) {
  var myval = Blockly.JavaScript.valueToCode(block, 'REPO', Blockly.JavaScript.ORDER_ATOMIC);
  console.log(myval);
};