import { Spell } from "models/spell.model";
import httpService from "./http.service";

interface PropsList {
  arcane?: boolean;
  divine?: boolean;
  universal?: boolean;
  abjuration?: boolean;
  divination?: boolean;
  convocation?: boolean;
  enchantment?: boolean;
  evocation?: boolean;
  illusion?: boolean;
  necromancy?: boolean;
  transmutation?: boolean;
  keywords?: string;
  executionId?: number;
  durationId?: number;
  rangeId?: number;
  areaId?: number;
  resistanceId?: number;
  publicationId?: number;
  grimoireId?: number;
}

class SpellService {
  private baseUrl = "/spell";

  getSpellById = async (spellId: number): Promise<{ spell: Spell }> => {
    const response = await httpService.get(`${this.baseUrl}/id/${spellId}`);
    return { spell: response.spell };
  };

  getListAll = async (): Promise<{ spells: Spell[] }> => {
    const response = await httpService.get(`${this.baseUrl}/list-all`);
    return { spells: response.spells };
  };

  getByGrimoireAndUser = async (id: number): Promise<{ spells: Spell[] }> => {
    const response = await httpService.get(`${this.baseUrl}/list/grimoire/id/${id}`);
    return { spells: response.spells };
  };

  getList = async (filters?: PropsList): Promise<{ spells: Spell[] }> => {
    let query = "?";

    query += filters.arcane ? `arcane=${filters.arcane}&` : "";
    query += filters.divine ? `divine=${filters.divine}&` : "";
    query += filters.universal ? `universal=${filters.universal}&` : "";
    query += filters.abjuration ? `abjuration=${filters.abjuration}&` : "";
    query += filters.divination ? `divination=${filters.divination}&` : "";
    query += filters.convocation ? `convocation=${filters.convocation}&` : "";
    query += filters.enchantment ? `enchantment=${filters.enchantment}&` : "";
    query += filters.evocation ? `evocation=${filters.evocation}&` : "";
    query += filters.illusion ? `illusion=${filters.illusion}&` : "";
    query += filters.necromancy ? `necromancy=${filters.necromancy}&` : "";
    query += filters.transmutation ? `transmutation=${filters.transmutation}&` : "";
    query += filters.keywords ? `keywords=${filters.keywords}&` : "";
    query += filters.executionId ? `executionId=${filters.executionId}&` : "";
    query += filters.durationId ? `durationId=${filters.durationId}&` : "";
    query += filters.rangeId ? `rangeId=${filters.rangeId}&` : "";
    query += filters.areaId ? `areaId=${filters.areaId}&` : "";
    query += filters.resistanceId ? `resistanceId=${filters.resistanceId}&` : "";
    query += filters.publicationId ? `publicationId=${filters.publicationId}&` : "";
    query += filters.grimoireId ? `grimoireId=${filters.grimoireId}&` : "";

    query = query.substring(query.length - 1) == "&" ? query.substring(0, query.length - 1) : "";
    const response = await httpService.get(`${this.baseUrl}/list${query}`);
    return { spells: response.spells };
  };
}

export default new SpellService();
