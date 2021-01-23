export default class Utils {   
  static sortListBy = async (list, sortBy) => (
    await list.sort((a, b) => a[sortBy].localeCompare(b[sortBy])) 
  ) 

  static removeDuplicates = async(list) => (
    await Array.from(new Set(list)) 
  )

  static saveOnLocalStoge = async(key, value) => (
    await localStorage.setItem(key, JSON.stringify(value)) 
  )

  static getFromLocalStoge = async(key) => (
    await JSON.parse(localStorage.getItem(key))
  )
}