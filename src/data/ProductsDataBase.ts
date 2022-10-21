import { Product } from "../model/Products";
import { Tag } from "../model/Tag";
import { BaseDatabase } from "./BaseDataBase";

export class ProductsDataBase extends BaseDatabase {
  private static TABLE_PRODUCTS = "Amaro_products";
  private static TABLE_RELACAO = "Amaro_roupa_tag";
  private static TABLE_TAGS = "Amaro_tags";
  public insertProcucts = async (product: Product): Promise<void> => {
    try {
      await ProductsDataBase.connection(ProductsDataBase.TABLE_PRODUCTS).insert(
        product
      );
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
  public addTag = async (tag: Tag): Promise<void> => {
    try {
      await ProductsDataBase.connection(ProductsDataBase.TABLE_RELACAO).insert(
        tag
      );
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
  public getRoupaByfiltro = async (): Promise<void> => {};
  public busca = async (termo: string): Promise<any[]> => {
    const products = await ProductsDataBase.connection(
      ProductsDataBase.TABLE_PRODUCTS
    )
      .select(
        `${ProductsDataBase.TABLE_PRODUCTS}.id as id`,
        `${ProductsDataBase.TABLE_PRODUCTS}.name as name`,
        `${ProductsDataBase.TABLE_TAGS}.id as tagId`,
        `${ProductsDataBase.TABLE_TAGS}.tag as tags`
      )
      .leftJoin(
        ProductsDataBase.TABLE_RELACAO,
        `${ProductsDataBase.TABLE_PRODUCTS}.id`,
        "=",
        "id_roupa"
      )
      .leftJoin(
        ProductsDataBase.TABLE_TAGS,
        `${ProductsDataBase.TABLE_TAGS}.id`,
        "=",
        `${ProductsDataBase.TABLE_RELACAO}.id_tag`
      )

      .where("name", "like", `%${termo}%`)
      .orWhere(`${ProductsDataBase.TABLE_PRODUCTS}.id`, "=", termo)
      .union(function () {
        this.select(
          `${ProductsDataBase.TABLE_PRODUCTS}.id as id`,
          `${ProductsDataBase.TABLE_PRODUCTS}.name as name`,
          `${ProductsDataBase.TABLE_TAGS}.tag as tags`
        )
          .from(ProductsDataBase.TABLE_PRODUCTS)
          .leftJoin(
            ProductsDataBase.TABLE_RELACAO,
            `${ProductsDataBase.TABLE_PRODUCTS}.id`,
            "=",
            "id_roupa"
          )
          .leftJoin(
            ProductsDataBase.TABLE_TAGS,
            `${ProductsDataBase.TABLE_TAGS}.id`,
            "=",
            `${ProductsDataBase.TABLE_RELACAO}.id_tag`
          )
          .where(`${ProductsDataBase.TABLE_TAGS}.tag`, "like", `%${termo}%`)
          .orWhere(`${ProductsDataBase.TABLE_TAGS}.id`, "=", termo);
      });

    return products;
  };
}
