Blockly.defineBlocksWithJsonArray([
{
  "type": "config",
  "message0": "config %1 %2 %3",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "opcao",
      "options": [
        [
          "--global",
          "global"
        ],
        [
          "",
          "OPTIONNAME"
        ],
        [
          "",
          "OPTIONNAME"
        ]
      ]
    },
    {
      "type": "field_dropdown",
      "name": "tipo_entrada",
      "options": [
        [
          "user.name",
          "user.name"
        ],
        [
          "user.email",
          "user.email"
        ],
        [
          "",
          "OPTIONNAME"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "path",
      "check": "nome_email"
    }
  ],
  "colour": 50,
  "tooltip": "O config é o comando usado para configurar o ambiente Git, com ele você pode fazer query/set/replace/unset. Ele é muito utilizado para várias coisas, mas por enquanto vamos trabalhar com ele apenas para configurar o nosso diretório -> Em Opção selecione '--global', em Tipo Entrada selecione 'user.name' para colocar o seu nome ou 'user.email' para colocar o seu email e em Entrada escreva de acordo com a sua escolha(user.name = seu nome, user.email = seu email).",
  "helpUrl": ""
}

]);

Blockly.JavaScript['config'] = function(block) {
  var dropdown_opcao = block.getFieldValue('opcao');
  var dropdown_tipo_entrada = block.getFieldValue('tipo_entrada');
  var subString = Blockly.JavaScript.valueToCode(block, "path", Blockly.JavaScript.ORDER_ADDITION) || '0';
  if(subString==0){
    return "O bloco 'config' necessita de parâmetros.";
  }
  else{
    var code = "git config " + "--" + dropdown_opcao + " " + dropdown_tipo_entrada + " " + "\"" + subString + "\"";
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
  }
};

Blockly.defineBlocksWithJsonArray([
{
  "type": "nome_email",
  "message0": "%1",
  "args0": [
    {
      "type": "field_input",
      "name": "nome_email",
      "text": "nome/email"
    }
  ],
  "output": "nome_email",
  "colour": 50,
  "tooltip": "Informe usuário ou Email",
  "helpUrl": ""
}

]);

Blockly.JavaScript['nome_email'] = function(block) {
  var code = block.getFieldValue('nome_email');
 
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};