import { GrimoireModel } from "models/grimoire.model";
import httpService from "./http.service";

class GrimoireService {
  private baseUrl = "/grimoire";

  getGrimoireById = async (id: number): Promise<{ grimoire: GrimoireModel }> => {
    const response = await httpService.get(`${this.baseUrl}/id/${id}`);
    return { grimoire: response.grimoire };
  };

  listGrimoireByUserId = async (): Promise<{ grimoires: GrimoireModel[] }> => {
    const response = await httpService.get(`${this.baseUrl}`);
    return { grimoires: response.grimoires };
  };

  listGrimoireByNameAndUserId = async (name: string): Promise<{ grimoires: GrimoireModel[] }> => {
    const response = await httpService.get(`${this.baseUrl}/name/${name}`);
    return { grimoires: response.grimoires };
  };

  createGrimoire = async (formData: GrimoireModel): Promise<{ grimoire: GrimoireModel }> => {
    const response = await httpService.post(`${this.baseUrl}/create`, formData);
    return { grimoire: response.grimoire };
  };

  deleteGrimoire = async (id: number): Promise<{ grimoire: GrimoireModel }> => {
    const response = await httpService.delete(`${this.baseUrl}/delete/id/${id}`);
    return { grimoire: response.grimoire };
  };
}

export default new GrimoireService();
