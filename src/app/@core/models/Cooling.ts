import { Component } from "./Component";
import { Face } from "./Face";
import { Fluid } from "./Fluid";
import { Loss } from './Loss';
import { Passage } from "./Passage";

export interface Cooling {
    components: Component[];
    faces: Array<Face>;
    losses: Array<Loss>;
    passages: Array<Passage>;
    fluids: Array<Fluid>;
}