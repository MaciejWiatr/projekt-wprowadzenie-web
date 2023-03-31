/**
 * @typedef {Object} Application
 * @property {string} unit
 * @property {string} subject
 * @property {File} file
 * @property {string} content
 */

/** @type {HTMLFormElement} */
const applicationForm = document.querySelector(".new-application-form");
const applicationsTableBody = document.querySelector(
  ".applications-table-body"
);

const invalidResultContainer = document.querySelector(".invalid-result");

const renderApplications = () => {
  /** @type {Application[]} */
  const applications = getApplications();

  applicationsTableBody.innerHTML = "";

  applications.forEach((application) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="applications-table--body">${application.unit}</td>
      <td class="applications-table--body">Zaakceptowano</td>
      <td class="applications-table--body">${application.subject}</td>
      <td class="applications-table--body">
        <a class="applications-table--body-link">Pobierz</a>
      </td>
    `;
    applicationsTableBody.appendChild(row);
  });
};

const setInitialData = () => {
  const applications = getApplications();

  if (applications.length === 0) {
    saveApplication({
      unit: "Wydział Zarządzania",
      subject: "Założenie nowego przedsiębiorstwa",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nunc, eget aliquam nunc nisl eget nunc. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nunc, eget aliquam nunc nisl eget nunc.",
    });
    saveApplication({
      unit: "Wydział Zarządzania",
      subject: "Założenie nowego przedsiębiorstwa",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nunc, eget aliquam nunc nisl eget nunc. Donec auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nunc, eget aliquam nunc nisl eget nunc.",
    });
  }
};

const getApplications = () => {
  const applications = localStorage.getItem("applications");

  return applications ? JSON.parse(applications) : [];
};

const saveApplication = (application) => {
  const applications = getApplications();
  // Let's not store the file in localStorage :)
  delete application.file;
  applications.push(application);
  localStorage.setItem("applications", JSON.stringify(applications));
};

const clearValidation = () => {
  invalidResultContainer.innerText = "";
};

/**
 * @param {Application} input
 */
const validateInput = (input) => {
  const errors = [];

  // If content is less than 100 characters
  if (input.content.length < 100) {
    errors.push("Treść musi mieć przynajmniej 100 znaków");
  }

  // If file is over 10MB
  if (input.file.size > 10 * 1024 * 1024) {
    errors.push("Plik nie może być większy niż 10MB");
  }

  // If file is not a PDF
  if (input.file.type !== "application/pdf") {
    errors.push("Plik musi być w formacie PDF");
  }

  return errors;
};

applicationForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  clearValidation();

  const formData = new FormData(event.target);

  /** @type {Application} */
  const data = Object.fromEntries(formData);

  const errors = validateInput(data);

  if (errors.length > 0) {
    invalidResultContainer.innerText = errors.join(", ");
    return;
  }

  saveApplication(data);
  renderApplications();
  event.target.reset();
});

setInitialData();
renderApplications();
