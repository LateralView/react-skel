// Return true if is valid

export function validateUrl(url = '') {
  return /^(ftp|http|https):\/\/[^ "]+$/.test(url)
}

export function validateEmail(email = '') {
  return /\S+@\S+\.\S+/.test(email)
}

export function validatePassword(pass = '') {
  if (pass.length > 5) return true
}
