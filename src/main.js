// load items from JSON file
function loadItems() {
  return fetch("../data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
  // .then(console.log);
}

// create html string for item
function createHTMLString(item) {
  const { image, type, gender, size } = item;
  return `<li class="item">
            <img src="${image}" alt="${type}" class="item__thumbnail" />
            <span class="item__description">${gender}, ${size}</span>
        </li>`;
}

// display item list in items container
function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// handle button click event
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) return;

  const filtered = items.filter((item) => item[key] === value);
  displayItems(filtered);
}

// set eventListeners to each buttons
function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
