import createView from "../../modules/notion";

export default async function handler(req, res) {
  const { geo, page, ua } = req.body;
  //   await createMovie();
  createView({ geo, page, ua });
  res.status(200).json({ name: "John Doe" });
}
