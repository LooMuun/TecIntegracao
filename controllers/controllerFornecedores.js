const supabase = require('../config/supabase');

const getFornecedores = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('fornecedores')
            .select('*');

        if (error) throw error;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

const store = async (req, res) => {
    const { nome, cnpj, email, telefone } = req.body;

    if (!nome || !cnpj) {
        return res.status(400).json({ erro: "Os campos 'nome' e 'cnpj' são obrigatórios." });
    }

    try {
        const { data, error } = await supabase
            .from('fornecedores')
            .insert([{ nome, cnpj, email, telefone }])
            .select();

        if (error) throw error;
        return res.status(201).json(data[0]);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('fornecedores')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            // Como eu usei o single() botei isso pro erro nn ser generico
            if (error.code === 'PGRST116') {
                return res.status(404).json({ mensagem: "Fornecedor não encontrado." });
            }
            throw error;
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
};

module.exports = {
    getFornecedores,
    store,
    getById
};