(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const submitButton = form.querySelector(".contact-submit");
  const status = document.getElementById("contact-form-status");
  const endpoint = "https://script.google.com/macros/s/AKfycbx0HV-pVV-u6fDNs0sWV6DoasFeRYzOxglymUhBpDvsHUDFWLqR3r4UmtqoFVMNyq-nmw/exec";
  const fields = [
    { input: form.elements.namedItem("name"), error: document.getElementById("contact-name-error"), message: "Name must be at least 2 characters." },
    { input: form.elements.namedItem("email"), error: document.getElementById("contact-email-error"), message: "Enter a valid email address." },
    { input: form.elements.namedItem("phone"), error: document.getElementById("contact-phone-error"), message: "Phone number must be at least 10 characters." },
    { input: form.elements.namedItem("institute"), error: document.getElementById("contact-institute-error"), message: "Institute name must be at least 2 characters." }
  ];
  let isSubmitting = false;

  function validationMessage(field) {
    const value = field.input.value.trim();
    if (!value) return "This field is required.";
    if (field.input.type === "email" && !field.input.validity.valid) return "Enter a valid email address.";
    const minimum = field.input.minLength;
    if (minimum > 0 && value.length < minimum) return field.message;
    return "";
  }

  function updateField(field) {
    const message = validationMessage(field);
    field.input.setAttribute("aria-invalid", String(Boolean(message)));
    field.error.textContent = message || field.message;
    field.error.hidden = !message;
    return !message;
  }

  fields.forEach(field => field.input.addEventListener("input", () => {
    if (!field.error.hidden || field.input.hasAttribute("aria-invalid")) updateField(field);
  }));

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (isSubmitting) return;
    const invalid = fields.filter(field => !updateField(field));
    if (invalid.length) {
      status.textContent = "Please check the highlighted fields and try again.";
      status.dataset.state = "error";
      invalid[0].input.focus();
      return;
    }

    isSubmitting = true;
    submitButton.disabled = true;
    status.textContent = "Sending your message…";
    status.dataset.state = "pending";
    try {
      const body = new URLSearchParams(new FormData(form));
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: body.toString()
      });
      if (!response.ok) throw new Error("Contact form submission failed");
      status.textContent = "The contact service responded, but this website cannot verify that your message was saved. It may have been received. Your details are still here; please contact us by phone or email before retrying to avoid a duplicate.";
      status.dataset.state = "unverified";
    } catch {
      status.textContent = "We couldn’t verify the submission. It may have reached the contact team. Your details are still here; please contact us by phone or email before retrying to avoid a duplicate.";
      status.dataset.state = "error";
    } finally {
      isSubmitting = false;
      submitButton.disabled = false;
    }
  });
})();
