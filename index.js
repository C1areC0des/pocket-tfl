function fetchAndDisplayLineData(lineId) {
  // Fetch data about the line.
  fetch(`https://api.tfl.gov.uk/Line/${lineId}/StopPoints`, {method: 'GET'})
  .then(response => response.json())
  .then(lineData => {
    // Update the DOM with the lineData
    console.log(lineData)
  })
  .catch((error) => console.log('Error:', error))
}

fetch('https://api.tfl.gov.uk/Line/Mode/tube,elizabeth-line,overground,dlr/Status', {
  method: 'GET',
})
.then(response => response.json())
.then(data => {
  console.log(data)
  data.map(item => {
    const tubeLine = document.createElement('div')
    tubeLine.classList.add(item.id, 'tube')

    const tubeName = document.createElement('p')
    tubeName.innerHTML = item.name
    tubeLine.appendChild(tubeName)

    const tubeStatus = document.createElement('p')
    tubeStatus.innerHTML = item.lineStatuses[0].statusSeverityDescription
    tubeLine.appendChild(tubeStatus)

    const tubeList = document.querySelector('.tube-list')
    tubeList.appendChild(tubeLine)

    tubeLine.addEventListener('click', function() {
      const lineId = item.id
      // Use the History API to change the URL.
      history.pushState({ lineId: lineId }, '', '/'+ lineId)

      fetchAndDisplayLineData(lineId)
    })
  })
})
.catch((error) => console.log('Error:', error))

window.onpopstate = function(event) {
  if (event.state) {
    const lineId = event.state.lineId

    fetchAndDisplayLineData(lineId)
  }
}