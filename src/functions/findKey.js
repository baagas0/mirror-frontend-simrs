export default function (array, value, key) {
  // console.log('finkey', array, value, key)
  if(array){ //jika ada list
    for (let i = 0; i < array.length; i++) { //perulangan list
      const x = array[i];
      if(x[key] == value){ //jika value array sama dengan value
        return {...x, key: i} //return
      }
    }
  }
  return null
}