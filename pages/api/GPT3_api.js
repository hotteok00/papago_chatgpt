import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler(req, res) {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: JSON.parse(req.body),
            max_tokens: 1024
        })
        const data = response.data.choices[0].text

        console.log('chatGPT_api: ' + JSON.stringify(data))
        res.status(200).json({ data })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'failed to load data_chatGPT' })
    }
}