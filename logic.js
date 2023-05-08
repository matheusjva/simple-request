const content = document.getElementById('content')
const param = document.getElementById('search-text')

const useXhr = () => {
  const URL = param.value ? 'https://api.adviceslip.com/advice/search/' + param.value : 'https://api.adviceslip.com/advice'

  const xhr = new XMLHttpRequest()

  xhr.open('GET', URL)

  xhr.responseType = 'json'

  xhr.send()

  xhr.onload = () => {
    if (xhr.response.slips) {
      content.innerHTML = xhr.response.slips.map((item) => '<li>' + item.advice + '</li>').join('<br/>')
    } else if (xhr.response.slip) {
      content.innerHTML = '<li>' + xhr.response.slip.advice + '</li>'
    } else if (xhr.response.message) {
      content.innerHTML = xhr.response.message.text
    }
  }
}

const useFetch = () => {
  const URL = param.value ? 'https://api.adviceslip.com/advice/search/' + param.value : 'https://api.adviceslip.com/advice'

  fetch(URL)
    .then((response) =>
      response.json()
    ).then((response) => {
      if (response.slips) {
        content.innerHTML = response.slips.map((item) => '<li>' + item.advice + '</li>').join('<br/>')
      } else if (response.slip) {
        content.innerHTML = '<li>' + response.slip.advice + '</li>'
      } else if (response.message) {
        content.innerHTML = response.message.text
      }
    }
    ).catch((error) =>
      content.innerHTML = 'Oops! ' + error
    )
}

useFetch()