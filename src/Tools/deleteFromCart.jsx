import { showToastSuccess, showToastError } from "../Components/Style/Notifications";

export default async function HandleDeleteFromCart(item_id, user) {
  const data = {
    item_id: item_id
  };

  try {
    const response = await fetch("https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/cart/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${user}`, 
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      showToastSuccess(responseData.message);
    } else {
      const errorData = await response.json();
      showToastError(errorData.error);
    }
  } catch (error) {
    showToastError(`Une erreur s'est produite`);
  }
}