import React from "react";
import ItemForm from "./form";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { useNavigate } from "react-router-dom";

const NewItemPage = () => {
  const navigate = useNavigate();
  const user = useAtomValue(currentUserAtom);
  const handleCreateItem = async (item) => {
    const { title, content } = item;

    try {
      const response = await fetch(
        "https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/items",
        {
          method: "POST",
          headers: {
            Authorization: `${user}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item: {
              title,
              content,
              private: false,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const slug = data.id;
        console.log(` LE SLUUUUUUUUUUGG ${slug}`);
        // Redirect to the item show page using the slug
        navigate(`/item/${slug}`);
      } else {
        // Handle error response
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>New item</h1>
      <ItemForm onSubmit={handleCreateItem} />
    </div>
  );
};

export default NewItemPage;
