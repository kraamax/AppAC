import { Accion } from "./accion";
import { Actividad } from "./actividad";

export class PlanAcciones {
    idPlanAcciones:number;
    acciones:Accion[];
    fecha:Date;
    actividad:Actividad;
}
