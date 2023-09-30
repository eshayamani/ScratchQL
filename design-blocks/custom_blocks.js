Blockly.HSV_SATURATION = 1;

// SELECT
Blockly.Blocks['select'] = {
  init: function() {
    this.appendValueInput("SELECT")
        .appendField('SELECT ')
        .setCheck(['input','as','all','membership','agg_min','agg_max','agg_avg','agg_count','agg_sum'])
        .appendField(new Blockly.FieldDropdown([
          ['\u0020', 'blank'],
          ['ALL', 'all']
          ['DISTINCT', 'distinct']]), 'op');
    this.setInputsInline(false);
    this.setPreviousStatement(true); //add these blocks when created -- do we even need this?
    this.setNextStatement(true); //add when created
    this.setColour('#53DC9E');

  }
};

// USER INPUT 

// AS 

// ALL 

// MEMBERSHIP OPERATOR (DOT NOTATION)

// AGGREGATES (MIN, MAX, AVG, COUNT, SUM)

//---------------------------

// FROM

// JOIN

// WHERE 

// GROUP BY 

// HAVING 

// ORDER BY 


// and
// between 
// boolean 
// compare
// date 
// in / not in 
// limit 
// math 
// not 
// null 
// number 
// or 
// table 
