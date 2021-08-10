const axios = require('axios')

axios
  .delete('http://localhost:4000/api/v1/deleteLastPost', {
    posterName: `Jacob Kjörk`, 
    posterEmail: `jacob.kjork@dooer.com`,
    postBody: `Detta är ett meddelande från en postrequest`
  })
  .then(res => {
    console.log(`statusCode: ${res.status}`)
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })