const { Role, User, GenderBook, Book } = require('../models');

const esRolValido = async (role = '') => {
    const isExistRole = await Role.findOne({ role });
    if (!isExistRole) {
        throw new Error(`El rol ${role} no esta registrado en la DB`);
    }
};

const validarEmail = async (email = '') => {
    const isExist = await User.findOne({ email });

    if (isExist) {
        throw new Error(`El correo ${email} ya esta registrado`);
    }
};

const existUserById = async (id) => {
    const isExist = await User.findById(id);

    if (!isExist) {
        throw new Error(`El usuario con ID: ${id} no existe`);
    }
};

// const existCategory = async (nombre = '') => {
//     const category = nombre.toUpperCase();
//     const isExist = await Category.findOne({ nombre: category });

//     if (isExist) {
//         throw new Error(`La categoría ${nombre} ya existe`);
//     }
// };

// const existCategoryById = async (id = '') => {
//     const isExist = await Category.findById(id);

//     if (!isExist) {
//         throw new Error(`La categoría no existe`);
//     }
// };

// const existProduct = async (nombre = '') => {
//     const product = nombre.toUpperCase();
//     const isExist = await Product.findOne({ nombre: product });

//     if (isExist) {
//         throw new Error(`El producto ${nombre} ya existe`);
//     }
// };

// const existProductById = async (id = '') => {
//     const isExist = await Product.findById(id);

//     if (!isExist) {
//         throw new Error(`El producto no existe`);
//     }
// };

const validCollections = (collection = '', allowedCollections = []) => {
    if (!allowedCollections.includes(collection.toLowerCase().trim())) {
        throw new Error(`La colección: ${collection} no esta permitida - allowedCollections`);
    }
    return true;
};

const existGenderBook = async (gender) => {
    const isExist = await GenderBook.findOne({ gender });

    if (isExist) {
        throw new Error(`El genero ${gender} ya existe`);
    }
};

const validateGenderBook = async (gender) => {
    const isExist = await GenderBook.findOne({ gender });

    if (!isExist) {
        throw new Error(`El genero ${gender} no existe`);
    }
};

const existBookById = async (id) => {
    const isExist = await Book.findById(id);

    if (!isExist) {
        throw new Error(`El libro con ID: ${id} no existe`);
    }
};

module.exports = {
    esRolValido,
    validarEmail,
    existUserById,
    // existCategory,
    // existCategoryById,
    // existProduct,
    // existProductById,
    validCollections,
    existGenderBook,
    existBookById,
    validateGenderBook,
};
