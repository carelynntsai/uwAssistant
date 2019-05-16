const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET users listing. */
router.post('/', async function(req, res, next) {
  let course_code = req.body.queryResult.parameters["number-sequence"]
  let response = await fetchTime(course_code)
  res.send(createTextResponse(response));
});

async function fetchTime(code) {
  url = `https://api.uwaterloo.ca/v2/courses/SYDE/${code}/schedule.json?key=a5ff0a2ff73a21b39e22b50ef4ec8fb9`
  try{
  let response = await axios.get(url)
  let time = await response.data.data[0].classes[0].date.start_time
  return await ("Your course is at " + time)
  }
  catch(e){
    console.log(e)
    return("There seems to be a problem, try again later")
  }
}

function createTextResponse(textResponse){
  console.log(textResponse)
  let response = {
    "fulfillmentText": "This is a text response",
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            textResponse
          ]
        }
      }
    ],
    "source": "example.com",
    "payload": {
      "google": {
        "expectUserResponse": true,
        "richResponse": {
          "items": [
            {
              "simpleResponse": {
                "textToSpeech": textResponse
              }
            }
          ]
        }
      },
      "facebook": {
        "text": textResponse
      },
      "slack": {
        "text": textResponse
      }
    }
  }
  return response;
}

module.exports = router;
