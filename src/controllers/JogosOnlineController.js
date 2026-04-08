const Game = require('../models/jogosonline');

class JogosOnlineController {

    static async create(req, res) {
        try {
            const { 
                title, 
                genre, 
                platform, 
                 
            } = req.body;

            if (!title || !genre || !platform) {
                return res.status(400).json({ 
                    message: "Dados inválidos. Título, gênero e plataforma são obrigatórios." 
                });
            }

            const gameData = {
                title,
                genre,
                platform,
                
            };

            const newGame = await Game.create(gameData);
            
            return res.status(201).json({ 
                message: 'Jogo criado com sucesso!', 
                data: newGame 
            });

        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({ 
                    message: 'Erro de validação', 
                    errors: Object.values(error.errors).map(err => err.message)
                });
            }

            return res.status(500).json({ 
                message: 'Erro ao criar jogo', 
                error: error.message 
            });
        }
    }

    static async getAll(req, res) {
        try {
            const { title, genre, platform } = req.query;

            let filter = {};

            if (genre) filter.genre = genre;
            if (platform) filter.platform = platform;
            if (title){
                filter.multiplayer = multiplayer === 'true';
            }

            const games = await Game.find(filter).sort({ createdAt: -1 });

            return res.status(200).json({ 
                count: games.length,
                data: games 
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Erro ao buscar jogos', 
                error: error.message 
            });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const game = await Game.findById(id);

            if (!game) {
                return res.status(404).json({ message: 'Jogo não encontrado' });
            }

            return res.status(200).json({ data: game });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Erro ao buscar jogo', 
                error: error.message 
            });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { 
                title, 
                genre, 
                platform, 
                
            } = req.body;

            const updatedData = {};

            if (title !== undefined) updatedData.title = title;
            if (genre !== undefined) updatedData.genre = genre;
            if (platform !== undefined) updatedData.platform = platform;

            const updatedGame = await Game.findByIdAndUpdate(id, updatedData, { 
                new: true, 
                runValidators: true 
            });

            if (!updatedGame) {
                return res.status(404).json({ message: 'Jogo não encontrado' });
            }

            return res.status(200).json({ 
                message: 'Jogo atualizado com sucesso', 
                data: updatedGame 
            });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({ 
                    message: 'Erro de validação', 
                    errors: Object.values(error.errors).map(err => err.message)
                });
            }

            return res.status(500).json({ 
                message: 'Erro ao atualizar jogo', 
                error: error.message 
            });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedGame = await Game.findByIdAndDelete(id);

            if (!deletedGame) {
                return res.status(404).json({ message: 'Jogo não encontrado' });
            }

            return res.status(200).json({ 
                message: 'Jogo deletado com sucesso' 
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Erro ao deletar jogo', 
                error: error.message 
            });
        }
    }

    static async getMultiplayerGames(req, res) {
        try {
            const games = await Game.find({ multiplayer: true })
                                   .sort({ maxPlayers: -1 });

            return res.status(200).json({ 
                count: games.length,
                data: games 
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Erro ao buscar jogos multiplayer', 
                error: error.message 
            });
        }
    }
}

module.exports = JogosOnlineController;