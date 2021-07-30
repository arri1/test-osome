export  const sendToBackend = (data) => {
    const promise = new Promise((resolve,reject) => {
        setTimeout(() => {
            const res = {
                status: '400',
                errors: {
                    'name':['Не валидное email'],
                    'email':['Не валидное имя'],
                    'password':['Пароль слишком короткий','Пароль слишком длинный']
                }
            }
            reject(res)

        }, 2000)
    })
    return promise

}
