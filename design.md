# Design 

## Code
``` python
query = None
SELECT = None
FROM = None
WHERE = None

def text_prompt(msg):
  try:
    return raw_input(msg)
  except NameError:
    return input(msg)


query = ''
SELECT = text_prompt('Enter Attribute Name (Seperated by commas): ')
FROM = text_prompt('Enter Database Name: ')
WHERE = text_prompt('Enter Filter Criteria: ')
query = str(query) + 'SELECT '
query = str(query) + str(SELECT)
query = str(query) + ' FROM '
query = str(query) + str(FROM)
query = str(query) + ' WHERE '
query = str(query) + str(WHERE)
query = str(query) + ';'
```
## Blockly
<img width="526" alt="Screenshot 2023-09-17 at 6 16 15 PM" src="https://github.com/eshayamani/ScratchQL/assets/96713419/5b576111-3ac3-4196-b224-27072ec0992f">

