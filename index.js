const functions = require('firebase-functions')
const {dialogflow} = require('actions-on-google')

const WELCOME_INTENT = 'Default Welcome Intent'
const FALLBACK_INTENT = 'Default Fallback Intent'
// const NEED_QUOTE_INTENT = 'Need Quote'

const app = dialogflow{}

app.intent(WELCOME_INTENT, (conv) => {
    conv.ask("Hello, I'm the UW Assistant.")
})

app.intent(FALLBACK_INTENT, (conv) => {
    conv.ask("I don't understand.")
})

exports.dialogflowFirebaseFulfullment = functions.https.onRequest(app)