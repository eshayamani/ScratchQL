// SELECT and FROM 'select+from'
// first block of a query
Blockly.Blocks['SELECT+FROM'] = {
  init: function() {
    // SELECT statement with dropdown menu
    this.appendValueInput('SELECT')
      .appendField('SELECT ')
        //.setCheck(['input','as','all','membership','agg_min','agg_max','agg_avg','agg_count','agg_sum'])
      .appendField(new Blockly.FieldDropdown([
        ['\u0020', ''],
        ['ALL', '*'],
        ['DISTINCT', 'distinct']]), 'SELECT_FIELD');
    
    // FROM statement with dropdown menu of table names
    this.appendValueInput('FROM')
      .appendField('FROM ')
      // adding 5 out of 17 table names 
      .appendField(new Blockly.FieldDropdown([
        ['\u0020', 'blank'],
        ['ACTOR', 'actor'],
        ['ADDRESS', 'address'],
        ['CATEGORY', 'category'],
        ['CITY', 'city'],
        ['COUNTRY', 'country']]), 'FROM_FIELD');

    this.setInputsInline(false);
    this.setPreviousStatement(false); // no previoud
    this.setNextStatement(true, null); // add when created
    this.setOutput(true) // for recursive purposes (subqueries)
    this.setColour('#89CFF0'); // light blue
    this.setTooltip('Your SELECT and FROM statement');
  }
};

// generate code block for SELECT+FROM
Blockly.JavaScript['SELECT+FROM'] = function(block) {
  // select dropdown
  var select = block.getFieldValue('SELECT_FIELD');
  // from dropdown
  var from = block.getFieldValue('FROM_FIELD');

  var code = 'SELECT ' + select + text + ' FROM ' + from;
  return code;
};

// USER INPUT - 'input'
// displayed as a text block for any purpose
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

// generate code for input block
Blockly.JavaScript['INPUT'] = function(block) {
  // given text 
  var input = block.getFieldValue('USER_INPUT');
  return [input, Blockly.JavaScript.ORDER_ATOMIC];
};

// NUMBER - 'number'
// displayed as a number for any purpose such as limit
Blockly.Blocks['NUMBER'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumber('1'), 'NUM');
    this.setOutput(true, 'Number');
    this.setColour('#FFB3C6');
    this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
  }
};

// generate code for number block
Blockly.JavaScript['NUMBER'] = function(block) {
  // given number
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
// takes in two inputs as text or numbers with a operator between them
// used for blocks like WHERE
Blockly.Blocks['COMPARE'] = {
  /**
   * Block for arithmetic operations.
   * @this {Blockly.Block}
   */
  init: function() {
    this.setHelpUrl(Blockly.Msg.MATH_ARITHMETIC_HELPURL);
    this.setColour(Blockly.Msg.MATH_HUE);
    this.setOutput(true, 'Number');
    // first value
    this.appendValueInput('A')
        .setCheck(['Number', 'var', 'exp']);
    // adding dropdown menu of operators required
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
            ['=', '='],
            ['>', '>'],
            ['<', '<'],
            ['>=', '>='],
            ['<=', '<=']]), 'compare');
    // second value
    this.appendValueInput('B')
        .setCheck(['Number', 'var', 'exp']);
    this.setInputsInline(true);
    this.setColour('#A0C4FF');
    this.setTooltip(Blockly.Msg.MATH_ARITHMETIC_TOOLTIP);
  }
};

// generate code for compare block
Blockly.JavaScript['COMPARE'] = function(block) {
  // take in first value
  var A = Blockly.JavaScript.valueToCode(block, 'A', Blockly.JavaScript.ORDER_ATOMIC);
  // take in second value
  var B = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);
  // get opertaor for dropdown
  var operator = block.getFieldValue('compare')

  var code = A + ' ' + operator + ' ' + B;
  return code;
};

// WHERE - 'where'
Blockly.Blocks['WHERE'] = {
  init: function() {
    this.appendValueInput('WHERE')
        .appendField('WHERE ');
    // can be connected anywhere to anything
    this.setPreviousStatement(true, null); 
    this.setNextStatement(true, null);
    this.setColour('#CDB7F6');
    this.setTooltip('Your WHERE statement');
  }
}; 

// generate code for where block
Blockly.JavaScript['WHERE'] = function(block) {
  // from compare block connected to where
  var where = Blockly.JavaScript.statementToCode(block, 'WHERE', Blockly.JavaScript.ORDER_NONE);
  
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
        // check for number input
        .setCheck('Number');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null); 
    this.setNextStatement(true, null)
    // this.setOutput(true, 'input');
    this.setColour('#CDB7F6');
    this.setTooltip('Enter Limit');
  }
};

// generate code for limit block
Blockly.JavaScript['LIMIT'] = function(block) {
  // get value of input such as a number
  var limit = Blockly.JavaScript.valueToCode(block, 'LIMIT', Blockly.JavaScript.ORDER_ATOMIC);

  var code = ' LIMIT ' + limit;
  return code;
};

// Blockly.Blocks['END'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField('END');
//     this.setInputsInline(false);
//     this.setPreviousStatement(true, null);
//     this.setColour('#FF9997');
//     this.setTooltip('Put at the End of Query');
//   }
// };

// Blockly.JavaScript['END'] = function(block) {
//   code = ';'
//   return code;
// }
