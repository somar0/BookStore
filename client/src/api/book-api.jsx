export async function fetchBooks() {
    const response = await fetch('/api/books');
    if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}