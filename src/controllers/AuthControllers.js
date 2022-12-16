import * as bcrypt from 'bcrypt';



export async function signUp (req, res) {
    const userData = req.locals.userData;
    try{
        const encryptedPassword = bcrypt.hashSync(userData.password, 20)
        delete userData.password;
        delete userData.confirmPassword;

        const userToInsert = {...userData, encryptedPassword};

        
    } catch (err){
        res.send(err);
        console.log(err);
    }
}