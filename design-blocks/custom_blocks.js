Blockly.HSV_SATURATION = 1;

// SELECT - 'select'
Blockly.Blocks['select'] = {
  init: function() {
    this.appendValueInput('SELECT')
        .appendField('SELECT ')
        //.setCheck(['input','as','all','membership','agg_min','agg_max','agg_avg','agg_count','agg_sum'])
        .appendField(new Blockly.FieldDropdown([
          ['\u0020', 'blank'],
          ['ALL', 'all']
          ['DISTINCT', 'distinct']]), 'op')
    this.setInputsInline(false);
    this.setPreviousStatement(false); // would this be true?
    this.setNextStatement(true, ['FROM']); //add when created
    this.setColour('#53DC9E');
    this.setTooltip('Your SELECT statement');
  }
};

// USER INPUT - 'input'

// AS - 'as'

// ALL - 'all'

// MEMBERSHIP OPERATOR (DOT NOTATION) - 'membership'

// AGGREGATES (MIN, MAX, AVG, COUNT, SUM) - 'agg_min', 'agg_max', 'agg_avg', 'agg_count', 'agg_sum'

// FROM - 'from'
Blockly.Blocks['from'] = {
  init: function() {
    this.appendValueInput('FROM')
        .appendField('FROM ')
        //.setCheck(['table', 'as'])
    this.setInputsInline(false); 
    this.setPreviousStatement(true, ['SELECT']); 
    this.setNextStatement(true, ['WHERE']); 
    this.setColour('#53DC9E');
    this.setTooltip('Your FROM statement');
  }
};

// TABLE - 'table'

// JOIN - 'join' 

// COMPARISON - 'compare'

// WHERE - 'where'
Blockly.Blocks['where'] = {
  init: function() {
    this.appendValueInput('WHERE')
        //.setCheck(['input', 'and', 'or', 'compare', 'null', 'between', 'in', 'not'])
        .appendField('WHERE ')
    this.setPreviousStatement(true, ['FROM']); 
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


Blockly.JavaScript.forBlock['select'] = function(block) {
  var var_name = Blockly.JavaScript.valueToCode(block, 'VAR', Blockly.JavaScript.ORDER_NONE);
  var expr_code = Blockly.JavaScript.valueToCode(block, 'EXPR', Blockly.JavaScript.ORDER_NONE);
  var code = '(' + var_name + ' => ' + expr_code + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};