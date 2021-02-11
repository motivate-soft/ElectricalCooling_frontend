import { Stator } from "./components/Stator";
import { Housing } from './components/Housing';
import { Magnet } from './components/Magnet';
import { Winding } from "./components/Winding";
import { Rotor } from "./components/Rotor";
import { Operation } from "./components/Operation";

export interface Component {
    Active: boolean;
    Type: string;
    Parameters: any;
    // Parameters: Stator | Housing | Rotor | Winding | Magnet | Operation;
}