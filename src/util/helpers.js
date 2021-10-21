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

export function categorie (geburtstag) {
  var year = geburtstag.toDate().getFullYear()
  var thisyear = new Date().getFullYear()
  var date1 = new Date('June 30, ' + thisyear)
  if (new Date() > date1) {
    if (year > thisyear - 8) {
      return 'Poussins / U8'
    } else if (year > thisyear - 10) {
      return 'Pupilles / U10'
    } else if (year > thisyear - 12) {
      return 'Benjamins / U12'
    } else if (year > thisyear - 14) {
      return 'Minimes / U14'
    } else if (year > thisyear - 17) {
      return 'Cadets / U17'
    } else if (year > thisyear - 20) {
      return 'Junioren / U20'
    } else if (year > thisyear - 45) {
      if (year >= thisyear - 23) {
        return 'Senioren (U23)'
      } else {
        return 'Senioren'
      }
    } else {
      return 'Veteranen'
    }
  } else {
    thisyear--
    if (year > thisyear - 8) {
      return 'Poussins / U8'
    } else if (year > thisyear - 10) {
      return 'Pupilles / U10'
    } else if (year > thisyear - 12) {
      return 'Benjamins / U12'
    } else if (year > thisyear - 14) {
      return 'Minimes / U14'
    } else if (year > thisyear - 17) {
      return 'Cadets / U17'
    } else if (year > thisyear - 20) {
      return 'Junioren / U20'
    } else if (year > thisyear - 45) {
      if (year >= thisyear - 23) {
        return 'Senioren (U23)'
      } else {
        return 'Senioren'
      }
    } else {
      return 'Veteranen'
    }
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
