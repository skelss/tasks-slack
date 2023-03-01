export class OperationWithString {

    constructor(string){
        this.string = string
    }

    //Преобразует строку к нижнему регистру, но первая буква большая
    toDefault(){
        return this.string[0].toUpperCase() + this.string.slice(1).toLowerCase()
    }

    //Преобразует строку с целью правильной расстановки пробелов
    toCorrectSentence(){
        let arrOfSymbols = this.string.split('')
        arrOfSymbols.push(' ')
        arrOfSymbols.unshift(' ')

        for(let i = 1; i < arrOfSymbols.length - 1; i++){

            let itemCode = arrOfSymbols[i].charCodeAt(0)
            if((itemCode >= 33 && itemCode <= 46) || 
                (itemCode >= 58 && itemCode <= 63)){

                if(arrOfSymbols[i + 1].charCodeAt(0) != 32) 
                    arrOfSymbols.splice(i + 1, 0, ' ')
                if(arrOfSymbols[i - 1].charCodeAt(0) == 32) 
                    arrOfSymbols.splice(i - 1, 1)
            }

            while((i != arrOfSymbols.length - 1) && 
                (arrOfSymbols[i].charCodeAt(0) == 32) &&
                (arrOfSymbols[i + 1].charCodeAt(0) == 32)){

                arrOfSymbols.splice(i, 1)
            }
        }
        return arrOfSymbols.join('').trim()
    }

    //Считает количество слов в строке
    sumOfWords(){
        return this.string.split(' ').length
    }

    //Считает количество уникальных слов (каждого) в строке
    sumOfUniqueWords(){
        let arrOfSymbols = this.string.toLowerCase().split('')
        arrOfSymbols.map((item, index) => {
            let itemCode = item.charCodeAt(0)
            if(!((itemCode == 32) || (itemCode >= 1072 && itemCode <= 1103) ||
                (itemCode >= 97 && itemCode <= 122)))
                arrOfSymbols.splice(index, 1)
        })

        let arrOfWords = arrOfSymbols.join('').split(' ')
        let setOfWords = new Set(arrOfWords)
        let result = {}

        Array.from(setOfWords).map(item => {
            let count = 0
            for(let i = 0; i < arrOfWords.length; i++){
                if(item == arrOfWords[i])
                    count++
            }
            result[item] = count
        })
        return result
    }
}