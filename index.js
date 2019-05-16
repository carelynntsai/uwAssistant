const functions = require('firebase-functions')
const {dialogflow} = require('actions-on-google')

const WELCOME_INTENT = 'Default Welcome Intent'
const FALLBACK_INTENT = 'Default Fallback Intent'
const NEED_CLASS_TIME = 'needClassTime'

const app = dialogflow()

app.intent(WELCOME_INTENT, (conv) => {
    conv.ask("Hello, I'm the UW Assistant.")
})

app.intent(FALLBACK_INTENT, (conv) => {
    conv.ask("I don't understand.")
})

app.intent(NEED_CLASS_TIME, (conv) => {
    conv.ask("Fuck off")
})

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app)
