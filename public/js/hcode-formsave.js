HTMLFormElement.prototype.save = function(){
    let form = this;

    return new Promise((resolve, reject) => {   
        form.addEventListener('submit', e => {
            e.preventDefault()
            
            let formData = new FormData(form)
            console.log(formData)
            fetch(form.action, {
                method: form.method,
                body: formData
            })
               .then(res => res.json())
                .then(json => {
                    resolve(json)
                }).catch(err => {
                    reject(err)
                })
        })
    })
}