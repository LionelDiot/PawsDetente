import { showToastSuccess, showToastError } from "../Components/Style/Notifications";

export default async function HandleDeleteFromCart(item_id, user) {
  const data = {
    item_id: item_id
  };

  try {
    console.log(item_id)
    const response = await fetch("https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/cart/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${user}`, 
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      showToastSuccess(`L'article a été supprimé au panier`);
    } else {
      showToastError(`Une erreur s'est produite`);
    }
  } catch (error) {
    showToastError(`Une erreur s'est produite`);
  }
}