// SELECT - 'select'
Blockly.Blocks['SELECT+FROM'] = {
  init: function() {

    this.appendValueInput('SELECT')
      .appendField('SELECT ')
        //.setCheck(['input','as','all','membership','agg_min','agg_max','agg_avg','agg_count','agg_sum'])
      .appendField(new Blockly.FieldDropdown([
        ['\u0020', 'blank'],
        ['ALL', 'all'],
        ['DISTINCT', 'distinct']]), 'op')
    
    this.appendValueInput('FROM')
      .appendField('FROM ')
        //.setCheck(['table', 'as'])
      .appendField(new Blockly.FieldDropdown([
        ['\u0020', 'blank'],
        ['ACTOR', 'actor'],
        ['ADDRESS', 'address'],
        ['CATEGORY', 'category'],
        ['CITY', 'city'],
        ['COUNTRY', 'country']
      ]));

    this.setInputsInline(false);
    this.setPreviousStatement(false); // would this be true?
    this.setNextStatement(true, ['WHERE']); //add when created
    this.setColour('#53DC9E');
    this.setTooltip('Your SELECT and FROM statement');
  }
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
