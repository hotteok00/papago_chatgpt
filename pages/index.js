import { useRef } from 'react'


function HomePage() {
  const ko = "ko"
  const en = "en"

  const inputRef = useRef()
  const outputRef = useRef()
  const gptInputRef = useRef()
  const gptOutputRef = useRef()
  function handleRef(ref, input) {
    ref.current.value = input
  }

  let inputQuery, outputQuery, gptInputQuery, gptOutputQuery
  function setInit() {
    inputQuery = ''
    outputQuery = ''
    gptInputQuery = ''
    gptOutputQuery = ''
  }

  function handleChange(event) {
    inputQuery = event.target.value
    handleRef(inputRef, inputQuery)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    let str

    // 입력이 있을 경우
    if (inputQuery != "") {
      outputQuery = await papago(inputQuery, ko, en) // ko -> en
      handleRef(outputRef, outputQuery)

      gptInputQuery = await chatGPT(outputQuery)
      handleRef(gptInputRef, gptInputQuery)

      gptOutputQuery = await papago(gptInputQuery, en, ko) // en -> ko
      handleRef(gptOutputRef, gptOutputQuery)

      setInit()
    }
  }

  async function papago(input, src, trg) {
    if (input == '') return;

    const res = await fetch('/api/papago_api', {
      method: 'POST',
      body: JSON.stringify({
        input: input,
        source: src,
        target: trg
      })
    })

    if (res.ok) { // res가 정상적일 경우
      const result = await res.json()
      const str = result.data.replace(/\"/gi, "")
      return str
    }
    // res가 비정상적일 경우
    else console.log('Error: ' + res.status)
  }

  async function chatGPT(input) {
    if (input == '') return;

    const res = await fetch('/api/GPT3_api', {
      method: 'POST',
      body: JSON.stringify(input)
    })

    if (res.ok) {
      const result = await res.json()
      const str = result.data.replace(/\n/g, "")
      return str
    }
    else console.log('Error: ' + res.status)
  }

  return (
    <>
      <div>
        <h1>enter korean</h1>
        <form onSubmit={handleSubmit} >
          <textarea
            id="inputField"
            type='text'
            ref={inputRef}

            rows='10'
            cols='100'
            maxLength="5000"

            onChange={handleChange} />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <br />
      <div>
        <h1>result_1 papago translation</h1>
        <textarea
          id="outputField"
          type='text'
          ref={outputRef}

          rows='10'
          cols='100'
          maxLength="5000"

          readOnly />
      </div>
      <br />
      <div>
        <h1>result_2 chatGPT response</h1>
        <textarea
          id="gptInputField"
          type='text'
          ref={gptInputRef}

          rows='10'
          cols='100'
          maxLength="5000"

          readOnly />
      </div>
      <br />
      <div>
        <h1>result_3 response translation</h1>
        <textarea
          id="gptOutputField"
          type='text'
          ref={gptOutputRef}

          rows='10'
          cols='100'
          maxLength="5000"

          readOnly />
      </div>
    </>
  )
}

export default HomePage