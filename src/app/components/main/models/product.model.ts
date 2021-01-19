export class Product {
  codigo: number;
  descripcion: string;
  comision: string;

  toString(){
    return `
      codigo: ${this.codigo},
      descripcion: ${this.descripcion},
      comision: ${this.comision}
    `;
  }
}
