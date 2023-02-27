export const getFromLocalStorage = () => {
  let data = JSON.parse(localStorage.getItem("details"));
  if (data) return data;
  else window.location.reload();
  //to reload so that tokenCheck can happen
};

export const setLocalStorage = (data) => {
  if (!data) return false;
  localStorage.setItem("details", JSON.stringify(data));
};
