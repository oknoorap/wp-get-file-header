# WordPress Get File Header
Get WordPress file header information, see https://codex.wordpress.org/File_Header.

# Installation
`npm install wp-get-file-header`

# Usage
This example codes run in nodejs at least version 6.x.x

```javascript
const wpFileHeader = require('wp-get-file-header')

// 1st example
wpFileHeader('/example/wordpress/wp-content/themes/mytheme/style.css')
  .then(info => {
    console.log(info.themeName)
    console.log(info.description)
  })

// 2nd Example
wpFileHeader('/example/wordpress/wp-content/themes/mytheme/page-templates/full-width.php')
  .then(page => {
    console.log(page.templateName)
  })
```
