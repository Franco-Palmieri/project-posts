const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../../modules/user-module/model/User');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');


passport.serializeUser((user, done) =>{
    done(null, user._id);
})

//SerializeUser invia l'id dell'utente a DeserializeUser e quest'ultimo gli restituisce l'utente al quale corrisponde l'id.

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    })
})
// viene utilizzato passport-jwt per estrarre il JWT dal parametro di query. Verifica quindi che questo token sia stato firmato
// con il segreto o la chiave impostata durante
//  l'accesso ( TOP_SECRET). Se il token è valido, i dettagli dell'utente vengono passati al middleware successivo.
passport.use(new JWTstrategy(
    {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
        async(token, done)=>{
            try {
                return done(null, token.user);
            }catch(err){
                done(err);
            }
        }
    )
)

passport.use(new localStrategy (
    {usernameField: 'email'},
    (email, password, done) =>{
        User.findOne({email}, (err, user)=>{
            if(!user){
                return done(null, false, {message: `Questa email: ${email}, non è registrata`});
            }else{
                user.comparePass(password, (err, areEqual)=>{
                    if(areEqual){
                        return done(null, user);
                    }else{
                        return done(null, false, {message: `La password non è valida`});
                    }
                })
            }
        })
    } 
))

exports.isAuth = (req, res, next) =>{

    if(req.isAuthenticated()){
        return next();
    }else{
        res.status(401).send('Devi fare il login');
    }
}

exports.verifyToken = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send('Unhautorized');
    }
    const token = req.headers.authorization.split(' ')[1];
    if(token == 'null'){
        return res.status(401).send('Unhautorized');
    }
    const payload = jwt.verify(token, 'TOP_SECRET');
    req.user = payload.user._id;
    next();
}


