const catchError = require('../utils/catchError');
const User = require('../models/User');

//Obtener todos los registros de un modelo model.findAll()
const getAll = catchError(async(req, res) => {
    // Operaciones...
    const result = await User.findAll()
    return res.json(result)
});
//para crear ususrios
const create = catchError(async(req, res)=>{

    const result = await User.create(req.body)
    return res.status(201).json(result)
});

//Obtener un único registro por su id model.findByPk()
const getOne = catchError(async(req, res) => {

    const {id} = req.params
    const result = await User.findByPk(id)
    if (!result) return res.sendStatus(404)
    return res.json(result)

});

//Eliminar un registro model.destroy()
const destroy = catchError(async(req, res) => {

    const { id } = req.params;
    const user = await User.findByPk(id)

    if (!user) return res.sendStatus(404)
    await user.destroy()

    return res.sendStatus(204)

});

//actualizar registros update

const update = catchError(async(req, res) => {
    const { id } = req.params
const result = await User.update(
     req.body,
      {where: {id}, returning:true}

    )
    if (result[0]== 0) return res.sendStatus(404)


  return res.json (result[1][0])
});


module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update
}