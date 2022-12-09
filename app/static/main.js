const canvasElement = document.getElementById('draw-area');
const canvas = new HandwritingCanvas(canvasElement);

const clearButtonElement = document.getElementById('clear-button');
clearButtonElement.addEventListener('click', () => {
  canvas.clear();
})

const predictButtonElement = document.getElementById('predict-button');
predictButtonElement.addEventListener('click', async () => {
  if (canvas.isEmpty) {
    return;
  }

  const blob = await canvas.toBlob('image/png');
  const formData = new FormData();
  formData.append('image', blob, 'number.png');


  const response = await fetch('/api/predict', {
    method: 'POST',
    body: formData,
  });
  const responseData = await response.json();

  const tableBodyElement = document.getElementById('result-table-body');
  while (tableBodyElement.firstChild) {
    tableBodyElement.removeChild(tableBodyElement.firstChild)
  }

  const prohibilites = responseData.prohibilities;
  for (let i = 0; i < prohibilites.length; i++) {
    const tr = document.createElement('tr')

    const tdNumber = document.createElement('td')
    tdNumber.textContent = i;
    tr.appendChild(tdNumber);

    const tdProhibility = document.createElement('td')
    tdProhibility.textContent = (prohibilites[i] * 100).toFixed();
    tr.appendChild(tdProhibility);
    
    tableBodyElement.appendChild(tr);
  }
})
