import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

interface User {
  id: number | string;
  email: string;
  password: string;
  name: string;
  surname: string;
  cell: string;
}

let users: User[] = [];


app.post("/users", (req: Request, res: Response) => {
  const newUser: User = req.body;
  const exists = users.find((u) => u.email === newUser.email);
  if (exists) return res.status(400).json({ error: "User already exists" });

  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/users/email/:email", (req: Request, res: Response) => {
  const user = users.find((u) => u.email === req.params.email);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

app.put("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const index = users.findIndex((u) => String(u.id) === id);
  if (index === -1) return res.status(404).json({ error: "User not found" });

  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});

interface Item {
  id: number;
  name: string;
  category: string;
  quantity: number;
  purchased: boolean;
  dateAdded: string; 
}

let items: Item[] = [];

app.get("/items", (req: Request, res: Response) => {
  res.json(items);
});

app.get("/items/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = items.find((i) => i.id === id);
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

app.post("/items", (req: Request, res: Response) => {
  const newItem: Item = {
    ...req.body,
    id: Date.now(),
    purchased: req.body.purchased ?? false,
    dateAdded: new Date().toISOString(),
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put("/items/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return res.status(404).json({ error: "Item not found" });

  items[index] = { ...items[index], ...req.body };
  res.json(items[index]);
});

app.delete("/items/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  items = items.filter((i) => i.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

