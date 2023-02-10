const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const api_url = 'https://openapi.naver.com/v1/papago/n2mt'

export default async function handler(req, res) {
    try {
        const headers = new Headers({
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Naver-Client-Id": client_id,
            "X-Naver-Client-Secret": client_secret
        })

        const Query = JSON.parse(req.body)
        const input = Query.input
        const source = Query.source
        const target = Query.target
        const body = `source=${source}&target=${target}&text=${input}`

        const response = await fetch(api_url, {
            method: 'POST',
            headers: headers,
            body: body
        })
        const result = await response.json()
        const data = result.message.result.translatedText

        console.log('papago_api: ' + data)
        res.status(200).json({ data })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'failed to load data_papago' })
    }
}