// fetch items from JSON file
function loadItems() {
  return fetch("../data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
  // .then(console.log);
}

// create HTML element based on item data
function createElement(item) {
  const { type, gender, size, color, image } = item;

  const img = document.createElement("img");
  img.setAttribute("src", image);
  img.setAttribute("alt", type);
  img.setAttribute("class", "item__thumbnail");

  const span = document.createElement("span");
  span.setAttribute("class", "item__description");
  span.innerText = `${gender}, ${size}`;

  const li = document.createElement("li");
  li.setAttribute("class", "item");
  li.setAttribute("data-type", type);
  li.setAttribute("data-color", color);
  li.append(img);
  li.append(span);

  return li;
}

// update items visible options according to key-value
function updateItems(elements, key, value) {
  elements.forEach((elem) => {
    if (elem.dataset[key] === value) {
      elem.classList.remove("invisible");
    } else {
      elem.classList.add("invisible");
    }
  });
}

// handle button click event
function onButtonClick(event, elements) {
  const dataset = event.target.dataset;
  const { key, value } = dataset;
  if (key == null || key == value) return;

  updateItems(elements, key, value);
}

loadItems()
  .then((items) => {
    const elements = items.map((item) => createElement(item));
    const container = document.querySelector(".items");
    container.append(...elements);

    const buttons = document.querySelector(".buttons");
    buttons.addEventListener("click", (event) =>
      onButtonClick(event, elements)
    );
  })
  .catch(console.log);
