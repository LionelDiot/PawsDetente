import React, { useState } from "react";

const ItemForm = ({ item = {}, onSubmit }) => {
  const [title, setTitle] = useState(item.title || "");
  const [content, setContent] = useState(item.content || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { title, content };
    onSubmit(newItem);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ItemForm;
