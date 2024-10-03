import httpService from "./http.service";
import { Spell } from "models/spell.model";

class GrimoireSpellService {
  private baseUrl = "/grimoire-spell";

  associateMultiple = async (
    idsSpells: number[],
    grimoireId: number
  ): Promise<{ spells: Spell[] }> => {
    const response = await httpService.post(`${this.baseUrl}/associate-multiple`, {
      idsSpells,
      grimoireId,
    });
    return { spells: response.spells };
  };

  update = async (
    grimoireId: number,
    spellId: number,
    prepared: boolean
  ): Promise<{ spell: Spell }> => {
    const response = await httpService.put(`${this.baseUrl}/update`, {
      grimoireId,
      spellId,
      prepared,
    });
    return { spell: response.spell };
  };

  disassociate = async (grimoireId: number, spellId: number): Promise<{ msg: string }> => {
    const response = await httpService.delete(`${this.baseUrl}/disassociate`, {
      grimoireId,
      spellId,
    });
    return { msg: response.msg };
  };
}

export default new GrimoireSpellService();
