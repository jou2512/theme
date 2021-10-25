import firebase from 'firebase'

export function leadingSlash (str) {
  return str.startsWith('/') ? str : '/' + str
}

export function trailingSlash (str) {
  return str.endsWith('/') ? str : str + '/'
}

export const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

export function age (createdAt) {
  var startTime = createdAt
  var endTime = firebase.firestore.Timestamp.fromDate(new Date())
  var differenceInSeconds = endTime - startTime
  var age = Math.floor(differenceInSeconds / 31536000)
  console.log(startTime.toDate().getFullYear())
  return age
}

export function categorie (geburtstag, format = 'long') {
  var year = geburtstag.toDate().getFullYear()
  var thisyear = new Date().getFullYear()
  var date1 = new Date('June 30, ' + thisyear)

  var categorie = ''
  if (!(new Date() > date1)) thisyear--

  if (year > thisyear - 8) {
    categorie = 'Poussins / U8'
  } else if (year > thisyear - 10) {
    categorie = 'Pupilles / U10'
  } else if (year > thisyear - 12) {
    categorie = 'Benjamins / U12'
  } else if (year > thisyear - 14) {
    categorie = 'Minimes / U14'
  } else if (year > thisyear - 17) {
    categorie = 'Cadets / U17'
  } else if (year > thisyear - 20) {
    categorie = 'Junioren / U20'
  } else if (year > thisyear - 45) {
    if (year >= thisyear - 23) {
      categorie = 'Senioren / U23'
    } else {
      categorie = 'Senioren / Ü23'
    }
  } else {
    categorie = 'Veteranen / Ü45'
  }

  var ArrayParts = categorie.split(' ')

  if (format === 'long') {
    return categorie
  } else if (format === 'shortend') {
    return ArrayParts[0] + ' (' + ArrayParts[2] + ')'
  } else if (format === 'name') {
    return ArrayParts[0]
  } else if (format === 'age') {
    return ArrayParts[2]
  } else if (format === 'tag') {
    var charList = ArrayParts[2].split('')
    return 'u' + (charList.length === 2 ? charList[1] : charList[1] + '' + charList[2])
  }
}

export function weaponsize (geburtstag) {
  var year = geburtstag.toDate().getFullYear()
  var thisyear = new Date().getFullYear()
  var date1 = new Date('June 30, ' + thisyear)
  if (new Date() > date1) {
    if (year > thisyear - 10) {
      return '0'
    } else if (year > thisyear - 12) {
      return '2'
    } else {
      return '5'
    }
  } else {
    thisyear--
    if (year > thisyear - 10) {
      return '0'
    } else if (year > thisyear - 12) {
      return '2'
    } else {
      return '5'
    }
  }
}

export function convertDate (date) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return date.toDate().toLocaleDateString('de-DE', options)
}
