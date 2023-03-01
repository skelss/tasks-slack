class Product {
    constructor(name, price, quantity, description){
        this.name = name
        this.price = price
        this.quantity = quantity
        this.description = description
    }
}

function searchByString(arr, str){
    let result = arr
    let arrOfConditions = str.split('&')

    arrOfConditions.map(item => {
        if(item.includes('name')){
            let arrForName = item.split('-')
            let conditionName = arrForName[1]
            let valueName = arrForName[2]
            let param = 'name'
            checkByCondition(param, conditionName, valueName)
        }
        else if(item.includes('price')){
            let conditionPrice = ''
            let valuePrice = ''
            let param = 'price'
            item.split('-')[1].split('').forEach(element => {
                if(isNaN(element)) conditionPrice += element
                else valuePrice += element
            })
            checkByOperator(param, conditionPrice, valuePrice)
        }
        else if(item.includes('quantity')){
            let conditionQuantity = ''
            let valueQuantity = ''
            let param = 'quantity'
            item.split('-')[1].split('').forEach(element => {
                if(isNaN(element)) conditionQuantity += element
                else valueQuantity += element
            }) 
            checkByOperator(param, conditionQuantity, valueQuantity)
        }
        else if(item.includes('description')){
            let arrForDescription = item.split('-')
            let conditionDescription = arrForDescription[1]
            let valueDescription = arrForDescription[2]
            let param = 'description'
            checkByCondition(param, conditionDescription, valueDescription)
        }
    })

    return result

    function checkByCondition(param, condition, value){
        if(condition == 'contains') 
            result = result.filter(item => item[param].includes(value))
        else if (condition == 'starts')
            result = result.filter(item => item[param].startsWith(value))
        else if (condition == 'ends')
            result = result.filter(item => item[param].endsWith(value))
    }

    function checkByOperator(param, condition, value){
        if(condition == '=')
            result = result.filter(item => item[param] == value)
        else if(condition == '<')
            result = result.filter(item => item[param] < value)
        else if(condition == '>')
            result = result.filter(item => item[param] > value)
        else if(condition == '<=')
            result = result.filter(item => item[param] <= value)
        else if(condition == '>=')
            result = result.filter(item => item[param] >= value)
    }
}

let arrOfProducts = [
    new Product('milk', 82, 156, 'default milk'),
    new Product('chocolate milk', 125, 38, 'milk with chocolate added'),
    new Product('goat milk', 15, 199, 'farm milk'),
    new Product('beef meet', 355, 25, 'beef meet'),
    new Product('chicken meet', 287, 57, 'chicken meet'),
    new Product('pork meet', 350, 16, 'farm meet'),
    new Product('chokolate butter', 120, 100, 'butter with chocolate added'),
    new Product('butter', 170, 44, 'default butter'),
    new Product('light beer', 95, 200, 'belgian'),
    new Product('dark beer', 150, 40, 'german'),
]

let string = 'name-contains-meet&price->300&quantity-<50&description-contains-fa'

console.log(searchByString(arrOfProducts, string))

