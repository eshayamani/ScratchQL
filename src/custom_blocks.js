const tableColumns = {
  'actor': ['actor_id', 'first_name', 'last_name', 'last_update'],
  'address': ['address_id', 'address', 'address2', 'district', 'city_id', 'postal_code', 'phone', 'last_update'],
  'category': ['category_id', 'name', 'last_update'],
  'city': ['city_id', 'city', 'country_id', 'last_update'],
  'country': ['country_id', 'country', 'last_update'],
  'customer': ['customer_id', 'store_id', 'first_name', 'last_name', 'email', 'address_id', 'active', 'create_date', 'last_update'],
  'film': ['film_id', 'title', 'description', 'release_year', 'language_id', 'original_language_id', 'rental_duration', 'rental_rate', 'length', 'replacement_cost', 'rating', 'special_features', 'last_update'],
  'film_actor': ['actor_id', 'film_id', 'last_update'],
  'film_category': ['film_id', 'category_id', 'last_update'],
  'film_text': ['film_id', 'title', 'description'],
  'inventory': ['inventory_id', 'film_id', 'store_id', 'last_update'],
  'language': ['language_id', 'name', 'last_update'],
  'payment': ['payment_id', 'customer_id', 'staff_id', 'rental_id', 'amount', 'payment_date', 'last_update'],
  'rental': ['rental_id', 'rental_date', 'inventory_id', 'customer_id', 'return_date', 'staff_id', 'last_update'],
  'staff': ['staff_id', 'first_name', 'last_name', 'address_id', 'picture', 'email', 'store_id', 'active', 'username', 'password', 'last_update'],
  'store': ['store_id', 'manager_staff_id', 'address_id', 'last_update'],
}

Blockly.Blocks['VAR'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Table:')
        .appendField(new Blockly.FieldDropdown(this.populateTables.bind(this)), 'TABLES');

    this.appendDummyInput('COLUMN_SELECTOR')
        .appendField('Variable:')
        .appendField(new Blockly.FieldDropdown([['Select a table first', '']]), 'COLUMNS');

    this.setColour('#FFAB91');
    this.setTooltip('Select a column from a table');
    this.setOutput(true, 'VAR');
  },

  populateTables: function() {
    return Object.keys(tableColumns).map(table => [table, table]);
  },

  onchange: function(changeEvent) {
    if (changeEvent.element === 'field' && changeEvent.name === 'TABLES') {
      this.updateColumnsDropdown(changeEvent.newValue);
    }
  },

  updateColumnsDropdown: function(selectedTable) {
    if (tableColumns[selectedTable]) {
      this.getInput('COLUMN_SELECTOR').removeField('COLUMNS');
      this.getInput('COLUMN_SELECTOR').appendField(new Blockly.FieldDropdown(tableColumns[selectedTable].map(col => [col, col])), 'COLUMNS');
    } else {
      this.getInput('COLUMN_SELECTOR').removeField('COLUMNS');
      this.getInput('COLUMN_SELECTOR').appendField(new Blockly.FieldDropdown([['Select a table first', '']]), 'COLUMNS');
    }
  }

};

Blockly.JavaScript['VAR'] = function(block) {
  var column = block.getFieldValue('COLUMNS');
  var code = column;
  return [code, Blockly.JavaScript.ORDER_ATOMIC]; // Returns a tuple
};

// SELECT and FROM 'select+from'
// first block of a query
Blockly.Blocks['SELECT+FROM'] = {
  init: function() {
    // SELECT statement with dropdown menu
    this.appendValueInput('SELECT')
      .appendField('SELECT ')
      .setCheck(['VAR', 'var','AGGREGATE'])
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
  var select = block.getFieldValue('SELECT_FIELD');
  var text = block.getFieldValue('SELECT_TEXT');
  var input = Blockly.JavaScript.valueToCode(block, 'SELECT', Blockly.JavaScript.ORDER_ATOMIC); // Corrected to valueToCode
  var from = block.getFieldValue('FROM_FIELD');

  var code = 'SELECT ' + select + text + input + ' FROM ' + from;
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
        .setCheck(['Number', 'var', 'exp', 'VAR']);
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
        .setCheck(['Number', 'var', 'exp', 'VAR']);
    this.setInputsInline(false);
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
        .setCheck(['var','Number','exp', 'VAR']);
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

// BETWEEN - 'between'

// AND - 'and'

// OR - 'or'

// NULL - 'null'

// IN - 'in'

// NOT - 'not'

// GROUP BY - 'groupby'
Blockly.Blocks['GROUPBY'] = {
  init: function() {
    this.appendValueInput('GROUPBY')
        .appendField('GROUP BY')
        // get group by variable
        .setCheck('var', 'VAR');
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
        .setCheck()
        .appendField("DATABASE PATH");
    this.appendValueInput('SQL_BLOCK')
        .setCheck(null)
        .appendField("QUERY");

    this.setColour('#CC1100');
    this.setTooltip('Connect to an SQLite database with SQL query');
  }
};

// Generate JavaScript code for the SQLite connection block
Blockly.JavaScript['CONNECTION'] = function(block) {
  var dbPath = Blockly.JavaScript.valueToCode(block, 'CONNECTION', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'var sqlite3 = require("sqlite3").verbose();\n';
  code += 'var db = new sqlite3.Database(' + dbPath + ');\n';
  return code;
};
