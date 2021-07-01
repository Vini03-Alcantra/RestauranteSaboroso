class HcodeFileReader {
    constructor(inputEl, imgEl){
        this.inputEl = inputEl;
        this.imgEl = imgEl

        this.initInputEvent()
    }

    initInputEvent(){
        console.log(document.querySelector(this.inputEl))
        document.querySelector(this.inputEl).addEventListener("change", e=> {
            this.reader(e.target.files[0]).then(result => {
                document.querySelector(this.inputEl).src = result
            })
        })
    }

    reader(file){
        let reader = new FileReader();
        
        reader.onload = function(){
            resolve(reader.result)
        }

        reader.onerror = function(){
            reject("Não foi possível ler a imagem")
        }

        reader.readAsDataURL(file)
    }
}