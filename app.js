const departmentSelected = document.querySelector("#department-list");
const objectsContainer = document.querySelector("#objects-container");
const modal = document.querySelector("#modal");
const modalImage = document.querySelector("#modal-image");
const modalInfo = document.querySelector("#modal-info");
const closeModal = document.querySelector("#close-modal");

const paintingsButton = document.querySelector("#paintings-button");
const drawingsButton = document.querySelector("#drawings-button");
const photograpghsButton = document.querySelector("#photographs-button");

let arts = [];
// let startIndex = 0;
let page = 50;
let uniqueMedium = [];

const MET_MUSEUM_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1";

const fetchAllPaintings = async () => {
  const idsResponse = await fetch(
    `${MET_MUSEUM_URL}/objects?departmentIds=9&hasImages=true`
  );
  const idsData = await idsResponse.json();
  const ids = idsData.objectIDs.slice(0, 500);

  console.log(`Fetching details for ${ids.length} objects...`);

  const allData = [];

  for (let i = 0; i < ids.length; i++) {
    try {
      const res = await fetch(`${MET_MUSEUM_URL}/objects/${ids[i]}`);
      const obj = await res.json();
      const detailsObject = {
        id: obj.objectID,
        imageURL: obj.primaryImage,
        smallImageURL: obj.primaryImageSmall,
        department: obj.department,
        objectName: obj.objectName,
        title: obj.title,
        culture: obj.culture,
        period: obj.period,
        artistDisplayName: obj.asrtistDisplayName,
        artistAlphaSort: obj.artistAlphaSort,
        artistNationality: obj.artistNationality,
        artistGender: obj.artistGender,
        objectDate: obj.objectDate,
        medium: obj.medium,
        country: obj.country,
        objectURL: obj.objectURL,
      };
      if (obj.primaryImage) allData.push(detailsObject);
    } catch (err) {
      console.error(`Error fetching ID ${ids[i]}:`, err);
    }

    console.log(`Fetched ${i + 1}/${ids.length}`);

    // After every 30 requests, wait 2 minutes
    if ((i + 1) % 30 === 0) {
      console.log("Pausing for 2 minutes...");
      await new Promise((resolve) => setTimeout(resolve, 120000)); // 2 minutes
    }
    console.log(allData);
  }
};

// fetchAllPaintings().then();

const buildPage = (objectsIDs) => {
  const sliceObjectsIDs = objectsIDs.slice(page, page + 10);

  for (let object of sliceObjectsIDs) {
    const objectContainer = document.createElement("div");
    objectContainer.classList.add("object-container");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    const objectImg = document.createElement("img");
    objectImg.src = object.smallImageURL;
    // objectImg.width = 250;

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");

    const title = document.createElement("h3");
    title.classList.add("title");
    title.textContent = object.title;

    const author = document.createElement("p");
    author.classList.add("p-author");
    author.textContent = object.artistAlphaSort;

    const learnMoreButton = document.createElement("button");
    learnMoreButton.classList.add("learn-more-button");
    learnMoreButton.textContent = "Learn more";
    learnMoreButton.addEventListener("click", () => {
      modalInfo.replaceChildren();
      showDetails(object);
    });
    imageContainer.append(objectImg);
    infoContainer.append(title, author, learnMoreButton);
    objectContainer.append(imageContainer, infoContainer);
    objectsContainer.append(objectContainer);
  }
  objectsContainer.append(loadMoreBtn);
};

const loadMoreBtn = document.createElement("button");
loadMoreBtn.classList.add("load-more-button");
loadMoreBtn.textContent = "Load more";
loadMoreBtn.addEventListener("click", () => {
  page += 10;
  buildPage(arts);
  return loadMoreBtn;
});

const showDetails = (object) => {
  modalImage.src = object.imageURL;

  const title = document.createElement("h3");
  title.classList.add("title-modal");
  title.textContent = `TITLE: ${object.title}`;

  const author = document.createElement("p");
  author.textContent = `AUTHOR: ${
    object.artistAlphaSort ? object.artistAlphaSort : "Unknown"
  }`;

  const date = document.createElement("p");
  date.textContent = `DATE: ${
    object.objectDate ? object.objectDate : "Unknown"
  }`;

  modalInfo.append(title, author, date);
  modal.classList.remove("hidden");
};

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

const loadData = async (path) => {
  const response = await fetch(path);
  arts = await response.json();
  buildPage(arts);
};

paintingsButton.addEventListener("click", () => {
  objectsContainer.replaceChildren();
  loadData(`./paintings.json`);
});
drawingsButton.addEventListener("click", () => {
  objectsContainer.replaceChildren();
  loadData(`./drawings.json`);
});

photograpghsButton.addEventListener("click", () => {
  objectsContainer.replaceChildren();
  loadData(`./photo.json`);
});

const getUniqueValues = async () => {
  const response = await fetch(`./object.json`);
  paintings = await response.json();

  uniqueMedium = [...new Set(paintings.map((painting) => painting.culture))];
  console.log(uniqueMedium);
};

// getUniqueValues().then();
// loadData().then();
