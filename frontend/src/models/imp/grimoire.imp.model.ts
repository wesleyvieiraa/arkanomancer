import { GrimoireModel } from "models/grimoire.model";

class GrimoireI implements GrimoireModel {
  grimoireId: number;
  name: string;

  constructor() {
    this.name = "";
  }
}

export default GrimoireI;
