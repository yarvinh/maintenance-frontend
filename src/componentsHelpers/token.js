export const token = (data = "")=>{
    const token = localStorage.getItem('token')
    const secretKey = localStorage.getItem('secret_key')
    return {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token} ${secretKey}`,
        'content-type': data
      }
}

export const verificationToken = ()=>{
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
}


export const isLoginToken = ()=>{
  if (!!localStorage.getItem('token') && !!localStorage.getItem('secret_key'))
    return true

}

export const verificationSessionToken=()=>{
  return !!localStorage.getItem('token')
}

export const removeLoginToken = ()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('secret_key')
  localStorage.removeItem('account_type')
}

export const accountTypeToken = ()=>{
  return localStorage.getItem('account_type')
}