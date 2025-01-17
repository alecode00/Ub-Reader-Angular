export interface BooksList {
  error: string;
  total: string;
  page?: string;
  books: Book[];
}

export interface Book {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
  isAdded?: boolean;
  genre?: string;
}
