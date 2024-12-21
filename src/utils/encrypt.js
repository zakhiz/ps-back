import bcrypt from 'bcrypt';

export const createHash = async ({password, saltCount}) => {
    const salts = await bcrypt.genSalt(saltCount);
    return bcrypt.hash(password, salts)
}

export const validatePassword = (user, password) => {
    return bcrypt.compare(password, user.password);
}