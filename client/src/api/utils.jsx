export const sendBooksToServer = async (books) => {
    try {
      const response = await fetch("/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(books),
      });
      if (!response.ok) {
        throw new Error("Failed to send books to server");
      }
    } catch (error) {
      console.error(error);
    }
  };