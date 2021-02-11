import { Component } from "./Component";
import { Face } from "./Face";
import { Fluid } from "./Fluid";
import { Loss } from './Loss';
import { Passage } from "./Passage";

export interface Cooling {
    Components: Component[];
    Faces: Array<Face>;
    Losses: Array<Loss>;
    Passages: Array<Passage>;
    Fluids: Array<Fluid>;
}