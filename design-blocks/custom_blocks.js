// SELECT - 'select'
Blockly.Blocks['SELECT+FROM'] = {
  init: function() {

    this.appendValueInput('SELECT')
      .appendField('SELECT ')
        //.setCheck(['input','as','all','membership','agg_min','agg_max','agg_avg','agg_count','agg_sum'])
      .appendField(new Blockly.FieldDropdown([
        ['\u0020', 'blank'],
        ['ALL', '*'],
        ['DISTINCT', 'distinct']]), 'SELECT_FIELD');
    
    this.appendValueInput('FROM')
      .appendField('FROM ')
        //.setCheck(['table', 'as'])
      .appendField(new Blockly.FieldDropdown([
        ['\u0020', 'blank'],
        ['ACTOR', 'actor'],
        ['ADDRESS', 'address'],
        ['CATEGORY', 'category'],
        ['CITY', 'city'],
        ['COUNTRY', 'country']]), 'FROM_FIELD');

    this.setInputsInline(false);
    this.setPreviousStatement(false); // would this be true?
    this.setNextStatement(true, null); //add when created
    this.setColour('#89CFF0');
    this.setTooltip('Your SELECT and FROM statement');
  }
};

Blockly.JavaScript['SELECT+FROM'] = function(block) {
  var select = block.getFieldValue('SELECT_FIELD');
  //var select = Blockly.JavaScript.valueToCode(block, 'SELECT', Blockly.JavaScript.ORDER_NONE);
  var from = block.getFieldValue('FROM_FIELD');
  //var from = block.JavaScript.getFieldValue(block, 'FROM', Blockly.JavaScript.ORDER_NONE);
  
  // Ensure that the generated code is properly formatted
  var code = 'SELECT ' + select + ' FROM ' + from;
  return code;
};

// USER INPUT - 'input'
Blockly.Blocks['INPUT'] = {
  init: function() {
    this.appendValueInput('INPUT')
    .appendField(new Blockly.FieldTextInput('text'), 'USER_INPUT');

      this.setOutput(true, 'var');
      this.setInputsInline(false);
      this.setColour('#FFB3C6');
      this.setTooltip('Enter User Input');
  }
};

Blockly.JavaScript['INPUT'] = function(block) {
  var input = block.getFieldValue('USER_INPUT');
  return [input, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['NUMBER'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumber('1'), 'NUM');
    this.setOutput(true, 'Number');
    this.setColour('#FFB3C6');
    this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
  }
};

Blockly.JavaScript['NUMBER'] = function(block) {
  var numValue = block.getFieldValue('NUM');
  return [numValue, Blockly.JavaScript.ORDER_ATOMIC];
};

// AS - 'as'

// ALL - 'all'

// MEMBERSHIP OPERATOR (DOT NOTATION) - 'membership'

// AGGREGATES (MIN, MAX, AVG, COUNT, SUM) - 'agg_min', 'agg_max', 'agg_avg', 'agg_count', 'agg_sum'


// TABLE - 'table'

// JOIN - 'join' 

// COMPARISON - 'compare'
Blockly.Blocks['COMPARE'] = {
  /**
   * Block for arithmetic operations.
   * @this {Blockly.Block}
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
    this.setColour(Blockly.Msg.MATH_HUE);
    this.setOutput(true, 'Number');
    this.appendValueInput('A')
        .setCheck(['Number', 'var', 'exp']);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
            ['=', '='],
            ['>', '>'],
            ['<', '<'],
            ['>=', '>='],
            ['<=', '<=']]), 'compare');
    this.appendValueInput('B')
        .setCheck(['Number', 'var', 'exp']);
    this.setInputsInline(true);
    this.setColour('#A0C4FF');
    this.setTooltip(Blockly.Msg.MATH_ARITHMETIC_TOOLTIP);
  }
};

Blockly.JavaScript['COMPARE'] = function(block) {
  var A = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  var B = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);
  var operator = block.getFieldValue('compare')

  // Ensure that the generated code is properly formatted
  var code = A + ' ' + operator + ' ' + B;
  return code;
};

// WHERE - 'where'
Blockly.Blocks['WHERE'] = {
  init: function() {
    this.appendValueInput('WHERE')
        //.setCheck(['input', 'and', 'or', 'compare', 'null', 'between', 'in', 'not'])
        .appendField('WHERE ');
    this.setPreviousStatement(true, null); 
    this.setNextStatement(true, null);
    this.setColour('#CDB7F6');
    this.setTooltip('Your WHERE statement');
  }
}; 

Blockly.JavaScript['WHERE'] = function(block) {
  var where = Blockly.JavaScript.statementToCode(block, 'WHERE', Blockly.JavaScript.ORDER_NONE);
  // Ensure that the generated code is properly formatted
  var code = ' WHERE ' + where;
  return code;
};

// BETWEEN - 'between'

// AND - 'and'

// OR - 'or'

// NULL - 'null'

// IN - 'in'

// NOT - 'not'

// GROUP BY - 'groupby'

// HAVING - 'having'

// ORDER BY - 'orderby'

// LIMIT - 'limit' 
Blockly.Blocks['LIMIT'] = {
  init: function() {
    this.appendValueInput('LIMIT')
        .appendField('LIMIT')
        .setCheck('Number');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null); 
    this.setNextStatement(true, null)
    // this.setOutput(true, 'input');
    this.setColour('#CDB7F6');
    this.setTooltip('Enter Limit');
  }
};

Blockly.JavaScript['LIMIT'] = function(block) {
  var limit = Blockly.JavaScript.valueToCode(block, 'LIMIT', Blockly.JavaScript.ORDER_ATOMIC);
  // Ensure that the generated code is properly formatted
  var code = ' LIMIT ' + limit;
  return code;
};

Blockly.Blocks['END'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('END');
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setColour('#FF9997');
    this.setTooltip('Put at the End of Query');
  }
};

Blockly.JavaScript['END'] = function(block) {
  code = ';'
  return code;
}




// boolean 
// date 
// math 
// number 
