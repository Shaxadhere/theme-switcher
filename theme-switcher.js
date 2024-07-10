let colorPickers = []
let updatedColors = {
  dark: {
  },
  light: {
  }
}
let updatedColorsContainer = document.getElementById('updated-colors')
let messageContainer = document.getElementById('message')

function createColorPicker(mode, key, value) {
  const container = document.createElement('div');
  container.classList.add('color-picker');

  const label = document.createElement('label');
  label.setAttribute('for', `${mode}-${key}`);
  label.innerText = `${mode.charAt(0).toUpperCase() + mode.slice(1)} ${key.charAt(0).toUpperCase() + key.slice(1)}:`;

  const input = document.createElement('input');
  input.setAttribute('type', 'color');
  input.setAttribute('id', `${mode}-${key}`);
  colorPickers.push(`${mode}-${key}`)
  input.value = value;

  container.appendChild(label);
  container.appendChild(input);

  return container;
}

function renderColorPickers() {
  const container = document.getElementById('color-picker-container');

  Object.keys(colors).forEach(mode => {
    const modeContainer = document.createElement('div');
    modeContainer.classList.add('color-mode');

    const modeTitle = document.createElement('h4');
    modeTitle.innerText = `${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`;
    modeContainer.appendChild(modeTitle);

    Object.keys(colors[mode]).forEach(key => {
      const colorPicker = createColorPicker(mode, key, colors[mode][key]);
      modeContainer.appendChild(colorPicker);
    });

    container.appendChild(modeContainer);
  });
}

function submitColors() {
  colorPickers.forEach((item) => {
    const mode = item.split('-')[0];
    const key = item.split('-')[1];
    updatedColors[mode][key] = document.getElementById(item).value;
  })

  updatedColorsContainer.innerText = JSON.stringify(updatedColors, null, 2);
}

updatedColorsContainer.addEventListener('click', () => {
  navigator.clipboard.writeText(updatedColorsContainer.innerText);
  messageContainer.innerText = 'Copied to clipboard!';
});

document.addEventListener('DOMContentLoaded', renderColorPickers);
