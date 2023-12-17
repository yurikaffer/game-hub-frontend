import axios from 'axios'
import { IGame, ICreateGame, IUpdateGame } from '../Models'

const api = axios.create({
  baseURL: 'http://localhost:3333',
})

export const GameService = {
    async getGames(): Promise<IGame[]> {
      const games = await api.get<IGame[]>('/games')
  
      return games.data
    },
  
    async getGame(id: string) {
      const game = await api.get(`/games/${id}`)
  
      return game
    },
  
    async create({ name, description, price, link, file }: ICreateGame) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price.toString());
      formData.append('link', link);
      
      if (file) {
        formData.append('file', file);
      }
    
      const res = await api.post('/games', formData);
    
      return res;
    },
    
    async update({ id, name, description, price, link, file }: IUpdateGame) {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price.toString());
      formData.append('link', link);
      
      if (file) {
        formData.append('file', file);
      }

      const res = await api.put(`games/${id}`, formData);
      return res;
    },
  
    async delete(id: string) {
      await api.delete(`/games/${id}`)
    },
    
  }