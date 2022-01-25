module.exports = (req, res, next) => {
    // TODO
    // Aqui vai uma validação simples dos dados recebidos ex:
    if (req.body.name != undefined) {
        next()
    } else {
        res.json({
            response: 'dados inválidos',
            info: 'o nome do usuário é obrigatório'
        })
    }
}