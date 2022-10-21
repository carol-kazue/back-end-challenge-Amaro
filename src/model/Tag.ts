export class Tag {
  constructor(
    private id: string,
    private id_roupa: string,
    private id_tag: string
  ) {}

  getId() {
    return this.id;
  }
  getIdRoupa() {
    return this.id_roupa;
  }

  getIdTag() {
    return this.id_tag;
  }
}

export interface TagInputDTO {
  id_roupa: string;
  id_tag: string;
}
