export function validateUrl(url = '') {
  return /^(ftp|http|https):\/\/[^ "]+$/.test(url)
}

export function validateEmail(email = '') {
  return /\S+@\S+\.\S+/.test(email)
}
