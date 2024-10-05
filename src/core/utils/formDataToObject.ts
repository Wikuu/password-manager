const formDataToObject = (formEl: HTMLFormElement) => {
  const formData = new FormData(formEl);
  return Object.fromEntries(formData.entries());
};

export default formDataToObject;
