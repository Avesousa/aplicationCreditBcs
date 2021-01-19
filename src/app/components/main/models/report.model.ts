export class Report{
  nroCuit: number;
  nroCta: string;
  codigoTipoDoc: string;
  nroDocCliente: number;
  tasa?: number;
  moneda?: string;
  fechaVto: string;
  limiteSW: number;
  sucursal: string;
  limite?: number;
  motivo?: number;
  telefono?: string;
  tipoCliente?: string;
  nombre: string;
  codigoProducto?: number;
  //Para rechazado y aceptado
  plazoSW?: string;
  //Para rechazado
  descripcion?: string;
  //Para busqueda
  renueva?: string;
  cliente?: string;
}

export class DataReport{
  renueva: string;
  sucursal?: number;
  empleado?: number;
  cliente?: number; //tipo de cliente
  sucListado?: number;
  periodo: string;
}

export class DataSearch{
  nombre: string;
  sucursal?: number;
  perfil: string;
  nroCta: string;
  tipoDocumento: string;
  nroDocumento: string;
  cuit: string;
}

// 1.	Recomendación StrategyWare
export class Report1 {
  Mes_Vto_Acuerdo: string;
  Recomendacion_SW: string;
  Total: number;
}

// 2.	Cambios Realizados
export class Report2 {
  Nro_Cuenta: string;
  Nro_Cuit: number;
  Nombre: string;
  Fecha_Hasta: string;
  Periodo: string;
  Recomendacion: string;
  Nva_Recomendacion: string;
}

// 5.	Acuerdos Enviados (Detalle)
export class Report5 {
  FechaEnv: string;
  Nro_Cuenta: string;
  Nro_Cuit: number;
  Nombre: string;
  Fecha_Vto: string;
}

// 6.	Acuerdos Enviados (Resumen)
export class Report6 {
  Fecha: string;
  Usuario: string;
  Total: number;
}

// 3.	Comisiones Enviadas (Detalle)
export class Report3 {
  Moneda: string;
  Fecha_Env_Com: string;
  Nro_Cuenta: string;
  Nro_Cuit: number;
  Nombre: string;
  Lim: number;
  Importe: number;
}

// 4.	Comisiones Enviadas (Resumen)
export class Report4 {
  Fecha: string;
  Cant_Reg: number;
  Supervisor: string;
  Importe: number;
}

// 7.	Baja de Comisiones
export class Report7 {
  Nro_Cta: string;
  Nro_CUIT: number;
  Nombre: string;
  Supervisor: string;
  Fecha_Aprob: string;
  Motivo: string;
}

// 8. Comisiones Cobradas
export class Report8 {
  Nro_Cuenta: string;
  Nro_Cuit: number;
  Nombre: string;
  Env_Com: string;
  Env_Acu: string;
  Descripcion: string;
}

// 9. Excluidos del Cobro Comisión
export class Report9 {
  Nro_Cuenta: string;
  Nro_Cuit: number;
  Nombre: string;
  Fecha_Hasta: string;
  Periodo: string;
  Recomendacion: string;
  Nva_Recomendacion: string;
}
