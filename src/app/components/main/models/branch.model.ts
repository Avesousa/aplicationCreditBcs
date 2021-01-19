export class Branch {
  numero: number;
  nombre: string;

  toString(){
    return `
      numero: ${this.numero},
      nombre: ${this.nombre}
    `;
  }
}
