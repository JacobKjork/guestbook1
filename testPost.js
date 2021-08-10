const axios = require('axios')

axios
  .post('http://localhost:4000/api/v1/setPost', {
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
