// SELECT - 'select'
Blockly.Blocks['SELECT+FROM'] = {
  init: function() {

    this.appendValueInput('SELECT')
      .appendField('SELECT ')
        //.setCheck(['input','as','all','membership','agg_min','agg_max','agg_avg','agg_count','agg_sum'])
      .appendField(new Blockly.FieldDropdown([
        ['\u0020', 'blank'],
        ['ALL', 'all'],
        ['DISTINCT', 'distinct']]), 'op');
    
    this.appendValueInput('FROM')
      .appendField('FROM ')
        //.setCheck(['table', 'as'])
      .appendField(new Blockly.FieldDropdown([
        ['\u0020', 'blank'],
        ['ACTOR', 'actor'],
        ['ADDRESS', 'address'],
        ['CATEGORY', 'category'],
        ['CITY', 'city'],
        ['COUNTRY', 'country']]), 'op');

    this.setInputsInline(false);
    this.setPreviousStatement(false); // would this be true?
    this.setNextStatement(true, null); //add when created
    this.setColour('#53DC9E');
    this.setTooltip('Your SELECT and FROM statement');
  }
};

Blockly.JavaScript['SELECT+FROM'] = function(block) {
  var select = Blockly.JavaScript.valueToCode(block, 'SELECT', Blockly.JavaScript.ORDER_NONE);
  var from = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_NONE);
  
  // Ensure that the generated code is properly formatted
  var code = 'console.log("SELECT ' + select + ' FROM ' + from + '")';
  return code;
};

Blockly.Blocks['ATTRIBUTE'] = {
  init: function() {
    this.appendValueInput('ATTRIBUTE')
      .appendField('ATTRIBUTE')
      .appendField(new Blockly.FieldDropdown([
        ['\u0020', 'blank'],
        ['WHERE', 'where'],
        ['GROUPBY', 'groupby'],
        ['HAVING', 'having'],
        ['ORDERBY', 'orderby'],
        ['LIMIT', 'limit']]), 'op');

    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#8007F2')
    this.setTooltip('Add an Attribute to the Query');
  }
};

Blockly.JavaScript['SELECT+FROM'] = function(block) {
  var select = Blockly.JavaScript.valueToCode(block, 'SELECT', Blockly.JavaScript.ORDER_NONE);
  var from = Blockly.JavaScript.valueToCode(block, 'FROM', Blockly.JavaScript.ORDER_NONE);
  // Ensure that the generated code is properly formatted
  var code = console.log('SELECT ' + select + ' FROM ' + from + ';');
  return code;
};

// USER INPUT - 'input'

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
    this.setColour('#53DC9E');
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




// boolean 
// date 
// math 
// number 
