Blockly.defineBlocksWithJsonArray([
{
  "type": "add",
  "message0": "add %1",
  "args0": [
    {
      "type": "input_value",
      "name": "path",
      "check": [
        "arquivo",
        "arq"
      ]
    }
  ],
  "inputsInline": false,
  "colour": 135,
  "tooltip": "O git lembra de como os dados dos arquivos estão, para depois poder compará-los se houve alguma mudança. Esta lembrança é salva em um arquivo chamado 'Index', ele é temporário!(Veja git commit para como salvar permanentemente!). Este bloco deve ser usado sempre que o usuário tenha terminado de modificar um arquivo, para que as últimas modificações feitas sejam salvas no 'Index'",
  "helpUrl": ""
}
]);

Blockly.JavaScript['add'] = function(block) {
  var subString = Blockly.JavaScript.valueToCode(block,"path", Blockly.JavaScript.ORDER_ADDITION) || '0'
  if(subString==0){
    return "O bloco 'add' necessita de parâmetros.";
  }
  else{
    var code = "git add " + subString;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
};


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
  "tooltip": "Utilize '.' para adicionar todos os arquivos a partir do diretório atual ou informe o nome do arquivo que deseja adicionar",
  "helpUrl": ""
}

]);

Blockly.JavaScript['arq'] = function(block) {
    code = block.getFieldValue('arq');

    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.defineBlocksWithJsonArray([
{
  "type": "arquivo",
  "message0": "%1 %2",
  "args0": [
    {
      "type": "field_input",
      "name": "arquivo",
      "text": "nome_arquivo"
    },
    {
      "type": "input_value",
      "name": "NAME",
      "check": "arq"
    }
  ],
  "output": null,
  "colour": 135,
  "tooltip": "Informe o nome de um dos arquivos que deseja adicionar",
  "helpUrl": ""
}
]);

Blockly.JavaScript['arquivo'] = function(block) {
  var text = block.getFieldValue('arquivo');
  var subString = Blockly.JavaScript.valueToCode(block,'NAME', Blockly.JavaScript.ORDER_ADDITION) || '0';
  if(subString==0){
    return "0";
  }
  else{
    var code = text + " " + subString;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
};