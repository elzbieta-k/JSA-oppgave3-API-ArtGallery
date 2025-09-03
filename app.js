const departmentSelected = document.querySelector("#department-list");
const objectsContainer = document.querySelector("#objects-container");
const modal = document.querySelector("#modal");
const modalImage = document.querySelector("#modal-image");
const modalInfo = document.querySelector("#modal-info");
const closeModal = document.querySelector("#close-modal");

const paintingsButton = document.querySelector("#paintings-button");
const drawingsButton = document.querySelector("#drawings-button");
const robertLehmanButton = document.querySelector("#robert-lehman-button");

let arts = [];
let page = 0;
let showedArts = 5;

const MET_MUSEUM_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1";

//Function that builds the page
const buildPage = async (objectsIDs) => {
  console.log(objectsIDs);
  const sliceObjectsIDs = objectsIDs.slice(page, page + showedArts);

  for (let object of sliceObjectsIDs) {
    console.log(object);
    const res = await fetch(`${MET_MUSEUM_URL}/objects/${object}`);
    const obj = await res.json();
    console.log(obj);

    const objectContainer = document.createElement("div");
    objectContainer.classList.add("object-container");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    const objectImg = document.createElement("img");
    objectImg.src = obj.primaryImageSmall
      ? obj.primaryImageSmall
      : "./images/failed.png";

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");

    const title = document.createElement("h3");
    title.classList.add("title");
    title.textContent = obj.title;

    const author = document.createElement("p");
    author.classList.add("p-author");
    author.textContent = obj.artistAlphaSort;

    const learnMoreButton = document.createElement("button");
    learnMoreButton.classList.add("learn-more-button");
    learnMoreButton.textContent = "Learn more";
    learnMoreButton.addEventListener("click", () => {
      modalInfo.replaceChildren();
      showDetails(obj);
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
  page += 5;
  buildPage(arts);
  return loadMoreBtn;
});

//Function showDetails shows more details about an art in an  modal
const showDetails = (object) => {
  console.log(object);
  modalImage.src = object.primaryImage
    ? object.primaryImage
    : "./images/failed.png";

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

  const authorNationality = document.createElement("p");
  authorNationality.textContent = `NATIONALITY: ${
    object.artistNationality ? object.artistNationality : "Unknown"
  }`;

  const artworkType = document.createElement("p");
  artworkType.textContent = `ARTWORK TYPE: ${
    object.classification ? object.classification : "Not specified"
  }`;

  const medium = document.createElement("p");
  medium.textContent = `MEDIUM: ${
    object.medium ? object.medium : "Not specified"
  }`;

  const department = document.createElement("p");
  department.textContent = `DEPARTMENT: ${object.department}`;

  const url = document.createElement("a");
  url.href = object.objectURL;
  url.textContent = "FIND OUT MORE DETAILS ON THE WEBSITE 🔗";

  modalInfo.append(
    title,
    author,
    date,
    authorNationality,
    medium,
    artworkType,
    department,
    url
  );
  modal.classList.remove("hidden");
};

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

//Event listeners on each button which pass department number to fetchAllIDsForDepartment function
paintingsButton.addEventListener("click", async () => {
  objectsContainer.replaceChildren();
  const department = 11;
  fetchAllIDsForDepartment(department);
  page = 0;
});

drawingsButton.addEventListener("click", () => {
  objectsContainer.replaceChildren();
  const department = 9;
  fetchAllIDsForDepartment(department);
  page = 0;
});

robertLehmanButton.addEventListener("click", () => {
  objectsContainer.replaceChildren();
  const department = 15;
  fetchAllIDsForDepartment(department);
  page = 0;
});

//Function that fetched all id for chosen department and pass array with all id to the buildPage function
const fetchAllIDsForDepartment = async (department) => {
  const idsResponse = await fetch(
    `${MET_MUSEUM_URL}/objects?departmentIds=${department}&hasImages=true`
  );
  const data = await idsResponse.json();
  arts = data.objectIDs;
  buildPage(arts);
};
