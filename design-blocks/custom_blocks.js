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

// Blockly.Blocks['ATTRIBUTE'] = {
//   init: function() {
//     this.appendValueInput('ATTRIBUTE')
//       .appendField('ATTRIBUTE')
//       .appendField(new Blockly.FieldDropdown([
//         ['\u0020', 'blank'],
//         ['WHERE', 'where'],
//         ['GROUPBY', 'groupby'],
//         ['HAVING', 'having'],
//         ['ORDERBY', 'orderby'],
//         ['LIMIT', 'limit']]), 'op');

//     this.setInputsInline(false);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour('#8007F2')
//     this.setTooltip('Add an Attribute to the Query');
//   }
// };

// Blockly.JavaScript['ATTRIBUTE'] = function(block) {
//   var attribute = Blockly.JavaScript.valueToCode(block, 'ATTRIBUTE', Blockly.JavaScript.ORDER_NONE);

//   // Ensure that the generated code is properly formatted
//   var code = console.log('ATTRIBUTE ' + attribute + ';');
//   return code;
// };

// USER INPUT - 'input'
Blockly.Blocks['input'] = {
  init: function() {
    this.appendValueInput('input')
    .appendField('input:')
    .appendField(new Blockly.FieldNumber(1, null, null, 1), 'USER_INPUT');

      this.setOutput(true, 'var');
      this.setInputsInline(false);
      this.setColour('#53DC9E');
      this.setTooltip('Enter User Input');
  }
};

Blockly.Blocks['NUMBER'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumber('1'), 'NUM');
    this.setOutput(true, 'Number');
    this.setColour('53DC9E');
    this.setTooltip(Blockly.Msg.MATH_NUMBER_TOOLTIP);
  }
};

// AS - 'as'

// ALL - 'all'

// MEMBERSHIP OPERATOR (DOT NOTATION) - 'membership'

// AGGREGATES (MIN, MAX, AVG, COUNT, SUM) - 'agg_min', 'agg_max', 'agg_avg', 'agg_count', 'agg_sum'


// TABLE - 'table'

// JOIN - 'join' 

// COMPARISON - 'compare'

// WHERE - 'where'
Blockly.Blocks['WHERE'] = {
  init: function() {
    this.appendValueInput('WHERE')
        //.setCheck(['input', 'and', 'or', 'compare', 'null', 'between', 'in', 'not'])
        .appendField('WHERE ');
    this.setPreviousStatement(true, null); 
    //this.setNextStatement(true, ['GROUP BY'])
    this.setColour('#CDB7F6');
    this.setTooltip('Your WHERE statement');
  }
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
    // this.setOutput(true, 'input');
    this.setColour('#CDB7F6');
    this.setTooltip('Enter Limit');
  }
};

Blockly.JavaScript['NUMBER'] = function(block) {
  var numValue = block.getFieldValue('NUM');
  return numValue;
};

Blockly.JavaScript['LIMIT'] = function(block) {
  var limit = Blockly.JavaScript.valueToCode(block, 'LIMIT', Blockly.JavaScript.ORDER_ATOMIC);
  // Ensure that the generated code is properly formatted
  var code = ' LIMIT ' + limit;
  return code;
};





// boolean 
// date 
// math 
// number 
