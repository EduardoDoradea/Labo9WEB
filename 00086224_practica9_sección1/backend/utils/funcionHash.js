import bcrypt from 'bcrypt';

const hashPassword = async (contrasenia) => {
    return await bcrypt.hash(String(contrasenia), 10);
}

export default { hashPassword };