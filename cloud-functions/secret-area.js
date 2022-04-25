exports.handler = function(event, context, callback) {

  // Content to be sent when receiving correct response
  const secretContent = `
  <h3>Welcome To The Secret Area</h3>
  <p>Here we can tell you that the sky is <strong>blue</strong>, and two plus two equals four.</p>
  `
  
  let body
  //Check if the body has any value attacked as a post request
  if (event.body) {
    //Parse the response
    body = JSON.parse(event.body)
  } else {
    body = {}
  }

  // Check if the password is correct
  if (body.password == "javascript") {
    callback(null, {
      statusCode: 200,
      body: secretContent
    })
  } else {
    callback(null, {
      statusCode: 401
    })
  }

  
}