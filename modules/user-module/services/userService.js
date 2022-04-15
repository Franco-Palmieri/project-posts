const fs = require('fs');

/*          *** PROMISE ***
    Le promise restituiscono eventi asincroni, è bene usarle in async function()
    Posso uscire da una promise con resolve() o reject()

    resolve() restituisce undefined || parametro che le passi
    Il parametro di ritorno è un oggetto: Promise { <pending> }, a meno che non lo si legga con await
    SOLO tramite la resolve posso accedere al .then() che, se non ritorna nulla, rende la promise undefined
    NON posso usare la resolve() nel .then()

    reject() lancia un errore
    É sempre bene mettere un try-catch e solo DOPO chiamare una promise così da gestire l'eventuale errore
*/

module.exports = function () {

    function funzioneErrore() {
        throw new Error()
    }

    return {
        async funzioneProva(parametro1, parametro2, agg = "", setErr) {
            return new Promise(function (resolve, reject) {
                //Se ti provi a mette '/' davanti all'url, lui ti parte da C:Users/...
                //Se non metti '/' parte dalla cartella progetto aperta su vsc
                let url = "modules/user-module/directory/" + parametro1 + ".txt"

                //in fs la callback è obbligatoria
                fs.writeFile(url, parametro2, (err) => {
                    if(err) reject(err)

                    fs.appendFile(url, agg, (err) => {
                        if(err) reject(err)
                    })
                })

                if(setErr) {
                    try{
                        funzioneErrore()
                    } catch (e) {
                        reject(e)
                    }
                }

                resolve('De tacco')

            }).then(result => { //result == argomento della resolve == 'De tacco'
                return result += ' punta'
            })
        },

    }
}