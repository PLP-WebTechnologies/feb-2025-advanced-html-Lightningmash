import { v4 as uuidv4 } from "uuid";

let products = []; // In-memory array (acts like a DB)

export const getAllProducts = (req, res) => {
  let result = [...products];

  // Filter by category
  if (req.query.category) {
    result = result.filter((p) => p.category === req.query.category);
  }

  // Search by name
  if (req.query.search) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(req.query.search.toLowerCase())
    );
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = result.slice(start, end);

  res.json({ total: result.length, page, limit, data: paginated });
};
  

export const getProducts = (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const postProducts = (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const putProducts = (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Product not found" });
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
};

export const deleteProducts = (req, res) => {
  products = products.filter((p) => p.id !== req.params.id);
  res.json({ message: "Product deleted" });
};
