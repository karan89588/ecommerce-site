import bcrypt from 'bcrypt'
export const hashingPassword=async (password)=>{
    try {
        const saltrounds=10;
        const hashedPassword=await bcrypt.hash(password,saltrounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}

export const comparingPassword=async (password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
}