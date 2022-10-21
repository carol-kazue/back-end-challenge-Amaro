import { ProductsDataBase } from "../data/ProductsDataBase";
import { Product, ProductInputDTO } from "../model/Products";
import { Tag, TagInputDTO } from "../model/Tag";
import { IdGenerator } from "../services/idGenerator";

const productDataBase = new ProductsDataBase();
export class ProductsBusiness {
  insertProcucts = async (product: ProductInputDTO) => {
    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();
    const newProduct = new Product(id, product.name);
    console.log(id);
    await productDataBase.insertProcucts(newProduct);
    return id;
  };

  addTag = async (tag: TagInputDTO) => {
    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();
    const newTag = new Tag(id, tag.id_roupa, tag.id_tag);
    await productDataBase.addTag(newTag);
  };
  search = async (termo: string): Promise<any[]> => {
    return Object.values(
      (await productDataBase.busca(termo)).reduce((acc, product) => {
        if (acc[product.id]) {
          console.log("1");
          acc[product.id].tags.push(product.tags);
          return acc;
        }
        console.log("2");
        acc[product.id] = { ...product, tags: [product.tags] };
        return acc;
      }, {})
    );
  };
}
