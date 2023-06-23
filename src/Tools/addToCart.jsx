import { showToastSuccess, showToastError } from "../Components/Style/Notifications";

export default async function HandleAddToCart(item, user) {
  const data = {
    item_id: item.id
  };

  try {
    const response = await fetch("https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/cart/", {
      method: "POST",
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
