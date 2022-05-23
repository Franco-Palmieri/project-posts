const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const UserSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true,

    },
    surname: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
        
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
});

/* 

*/
UserSchema.pre('save', function(next){

    const user = this;
    
    //Se non c'è stata nessuna modifica della password significa che è già stata cryptata
    //quindi prosegue avanti (next)
    if(!user.isModified('password')){
        return next();
    }

    bcrypt.genSalt(10, (err, salt) =>{
        if(err){
            next(err);
        }
        bcrypt.hash(user.password, salt, null, (err, hash) =>{
            if(err){
                next(err);
            }
            user.password = hash;
            next();
        })
    })
})

/* 
    Metodo per comparare la password che inserisce l'utente con quella criptata (hash)
    quando un utente tenta di accedere, dobbiamo confrontare la password in testo normale con l'hash. Lo facciamo usando la compare funzione bcrypt.

    Passiamo bcrypt.compare()questi parametri:
    La password che stiamo confrontando
    L'hash memorizzato nel database
    Richiamo dell'errore e del risultato: se la password corrisponde all'hash, il risultato è true. Se non è una corrispondenza, il risultato è falso.
*/

UserSchema.methods.comparePass = function (password, callback) {

    bcrypt.compare(password, this.password, (err, areEqual)=>{
        if(err){
            return callback(err);
        }
        callback(null, areEqual);
    })
}


module.exports = mongoose.model('User', UserSchema);