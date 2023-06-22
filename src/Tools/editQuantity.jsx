import { showToastSuccess, showToastError } from "../Components/Style/Notifications";

export default async function EditQuantity(item_id, quantity, user) {
  const data = {
    item_id: item_id,
    quantity: quantity
  };

  try {
    const response = await fetch("https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/cart/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${user}`, 
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      showToastSuccess(`La quantité a bien été modifié`);
    } else {
      showToastError(`Une erreur s'est produite`);
    }
  } catch (error) {
    showToastError(`Une erreur s'est produite`);
  }
}