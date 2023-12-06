// SELECT and FROM 'select+from'
// first block of a query
Blockly.Blocks['SELECT+FROM'] = {
  init: function() {
    // SELECT statement with dropdown menu
    this.appendValueInput('SELECT')
      .appendField('SELECT ')
      .setCheck(['var','AGGREGATE'])
      .appendField(new Blockly.FieldDropdown([
        ['\u0020', ''],
        ['ALL', '*'],
        ['DISTINCT', 'DISTINCT']]), 'SELECT_FIELD')
        .appendField(new Blockly.FieldTextInput(''), 'SELECT_TEXT');
    
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
        ['COUNTRY', 'country'],
        ['CUSTOMER', 'customer'],
        ['FILM', 'film']]), 'FROM_FIELD');

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
  // add in line select text
  var text = (block.getFieldValue('SELECT_TEXT'));
  // add any text from input blocks
  var input = Blockly.JavaScript.statementToCode(block, 'SELECT', Blockly.JavaScript.ORDER_ATOMIC);
  // from dropdown
  var from = block.getFieldValue('FROM_FIELD');

  var code = 'SELECT ' + select + text + input + ' FROM ' + from;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
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

// AGGREGATES - 'aggregate'
// (MIN, MAX, AVG, COUNT, SUM) - 'agg_min', 'agg_max', 'agg_avg', 'agg_count', 'agg_sum'
Blockly.Blocks['AGGREGATE'] = {
  init: function() {
    this.appendValueInput('AGGREGATE')
        .appendField('AGG')
        .appendField(new Blockly.FieldDropdown([
          ['\u0020',''],
          ['MIN', 'MIN'],
          ['MAX', 'MAX'],
          ['AVG', 'AVG'],
          ['COUNT', 'COUNT'],
          ['SUM', 'SUM']]), 'AGG')
        .setCheck(['Number', 'var', 'exp']);
    this.setInputsInline(true);
    this.setOutput(true, 'var');
    this.setColour('#A0C4FF');
    this.setTooltip('Pick an Aggregate');
  }
};

// generate code block for AGGREGATE
Blockly.JavaScript['AGGREGATE'] = function(block) {
  // select dropdown
  var agg = block.getFieldValue('AGG');
  // get text from input block
  var input = Blockly.JavaScript.valueToCode(block, 'AGGREGATE', Blockly.JavaScript.ORDER_ATOMIC);
  // format for queries
  var code = agg + '(' + input + ')';
  return code;
};
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
        .appendField('WHERE ')
        .setCheck(['var','Number','exp']);
    // can be connected anywhere to anything
    this.setPreviousStatement(true, null); 
    this.setNextStatement(true, null);
    this.setColour('#CDB7F6');
    this.setTooltip('Your WHERE statement');
  }
}; 

// generate code for where block
Blockly.JavaScript['WHERE'] = function(block) {
  // get type of connected block
  var connectedBlock = block.getInputTargetBlock('WHERE');
  // check if its for compare
  if (connectedBlock && connectedBlock.type === 'COMPARE') {
    // use statement to code
    var where = Blockly.JavaScript.statementToCode(block, 'WHERE', Blockly.JavaScript.ORDER_NONE);
    var code = ' WHERE ' + where;
  } // check if its for input
  else if (connectedBlock.type === 'INPUT') {
    // use value to code
    var where = Blockly.JavaScript.valueToCode(block, 'WHERE', Blockly.JavaScript.ORDER_NONE);
    var code = ' WHERE ' + where;
  }
  else { // default case
    // this aint printing
    var code = 'WHERE';
  }
  
  return code;
};

// GROUP BY - 'groupby'
Blockly.Blocks['GROUPBY'] = {
  init: function() {
    this.appendValueInput('GROUPBY')
        .appendField('GROUP BY')
        // get group by variable
        .setCheck('var');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null); 
    this.setNextStatement(true, null)
    this.setColour('#CDB7F6');
    this.setTooltip('Enter Group By variable');
  }
};

// generate code for group by block
Blockly.JavaScript['GROUPBY'] = function(block) {
  // get value of group by variable
  var group = Blockly.JavaScript.valueToCode(block, 'GROUPBY', Blockly.JavaScript.ORDER_ATOMIC);
  var code = ' GROUP BY ' + group;
  return code;
};

// HAVING - 'having'

// ORDER BY - 'orderby'
Blockly.Blocks['ORDERBY'] = {
  init: function() {
    this.appendValueInput('ORDERBY')
        .appendField('ORDER BY')
        // get order by variable
        .setCheck('var');
        this.appendDummyInput()
        // check for asc or desc requirements
        .appendField(new Blockly.FieldDropdown([
          ['\u0020', 'blank'],
          ['ASC', 'ASC'],
          ['DESC', 'DESC']]), 'order');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null); 
    this.setNextStatement(true, null)
    this.setColour('#CDB7F6');
    this.setTooltip('Enter Order By variable');
  }
};

// generate code for group by block
Blockly.JavaScript['ORDERBY'] = function(block) {
  // get value of order by variable
  var group = Blockly.JavaScript.valueToCode(block, 'ORDERBY', Blockly.JavaScript.ORDER_ATOMIC);
  // get asc or desc value
  var order = block.getFieldValue('order')
  var code = ' ORDER BY ' + group + ' ' + order;
  return code;
};

// LIMIT - 'limit' 
Blockly.Blocks['LIMIT'] = {
  init: function() {
    this.appendValueInput('LIMIT')
        .appendField('LIMIT')
        // check for number input
        .setCheck('Number');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null); 
    this.setNextStatement(false, null);
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

// Connection block with two inputs
Blockly.Blocks['CONNECTION'] = {
  init: function() {
    this.appendValueInput('CONNECTION')
        .setCheck('SELECT+FROM')
        .appendField("DATABASE PATH");
    this.setColour('#00E497');
    this.setTooltip('Connect to an SQLite database with SQL query');
  }
};

// Generate JavaScript code for the SQLite connection block
Blockly.JavaScript['CONNECTION'] = function(block) { 
  //var query = Blockly.JavaScript.valueToCode(block, 'SELECT+FROM', Blockly.JavaScript.ORDER_ATOMIC);
    // Get the connected block's code
  var connectedCode = Blockly.JavaScript.valueToCode(block, 'CONNECTION', Blockly.JavaScript.ORDER_ATOMIC);

  // Generate the connection code
  var code = `
  db_config = {
      'host': '34.27.128.43',
      'user': 'root',
      'password': 'pl',
      'database': 'sakila'
  }
  cnx = mysql.connector.connect(db_config)
  try:
      cursor = cnx.cursor()
      query = "${connectedCode}"
      
      cursor.execute(query)

      result = cursor.fetchall()
      for row in result:
          print(row)
  
  finally:
      cursor.close()
      cnx.close()`  
  ;

  return code;
};
