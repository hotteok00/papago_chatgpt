import { useState } from 'react'

function HomePage() {
  const [inputQuery, setInputQuery] = useState('')
  const [outputQuery, setOutputQuery] = useState('')

  function handleChange(event) {
    setInputQuery(event.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    console.log(inputQuery)

    // 입력이 있을 경우
    if (inputQuery != "") {
      const res = await fetch('/api/papago_api', {
        method: 'POST',
        body: JSON.stringify(inputQuery)
      })

      if (res.ok) { // res가 정상적일 경우
        const tmp = await res.json()
        setOutputQuery(tmp.data.replace(/\"/gi, ""))
      }
      else {        // res가 비정상적일 경우
        console.log('Error: ' + res.status)
      }
    }
  }

  return (
    <>
      <div>
        <h1>enter korean</h1>
        <form onSubmit={handleSubmit} >
          <textarea
            id="inputField"
            type='text'
            value={inputQuery}

            rows='5'
            maxLength="100"

            onChange={handleChange} />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <br />
      <div>
        <h1>result</h1>
        <textarea
          id="outputField"
          type='text'
          defaultValue={outputQuery}

          rows='5'
          maxLength="100"

          readOnly />
      </div>
    </>
  )
}

export default HomePage