import { ProductInputDTO } from "../model/Products";
import { Request, Response } from "express";
import { ProductsBusiness } from "../business/ProductsBusiness";
import { TagInputDTO } from "../model/Tag";

const productsBusiness = new ProductsBusiness();
export class ProductController {
  async insertProcucts(req: Request, res: Response) {
    try {
      const input: ProductInputDTO = {
        name: req.body.name,
      };
      await productsBusiness.insertProcucts(input);
      res.status(200).send("Produto cadastrado com sucesso!");
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }

  async addTag(req: Request, res: Response) {
    try {
      const input: TagInputDTO = {
        id_roupa: req.body.id_roupa,
        id_tag: req.body.id_tag,
      };
      await productsBusiness.addTag(input);
      res.status(200).send("Tag atribuída com sucesso!");
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
  async search(req: Request, res: Response) {
    try {
      const termo = req.query.q as string;
      const results = await productsBusiness.search(termo);
      res.status(200).send(results);
    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  }
}
