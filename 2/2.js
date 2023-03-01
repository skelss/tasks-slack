export class Calculator {

    /*constructor(a, b){
        this.a = a.split('')
        this.b = b.split('')
    }*/

    sum(a, b){
        this.a = a.split('')
        this.b = b.split('')

        let diff = this.a.length - this.b.length
        if(diff != 0) this.toEqual(diff)
        
        let result = []
        for(let i = 0; i < this.a.length; i++)
            result[i] = Number(this.a[i]) + Number(this.b[i])
        result.reverse()
        result.push(0)

        for(let i = 0; i < result.length; i++){
            if(result[i] >= 10){
                result[i + 1] = result[i + 1] + Math.trunc(result[i] / 10)
                result[i] %= 10
            }
        }
    
        if(result[result.length - 1] == 0) result.pop()

        return result.reverse().join('')
    }

    subtract(a, b){
        this.a = a.split('')
        this.b = b.split('')

        let diff = this.a.length - this.b.length
        if(diff != 0) this.toEqual(diff)

        let max = this.a
        let min = this.b
        let i = 0
        let operator = false
        let flag = true

        do {
            if(this.a[i] > this.b[i]){
                flag = false
            }
            else if(this.a[i] < this.b[i]){
                max = this.b
                min = this.a
                operator = true
                flag = false
            }
            else{
                i++
            }
        }
        while((flag) && (i < this.a.length))
        
        let result = []
        for(let i = 0; i < this.a.length; i++)
            result[i] = Number(max[i]) - Number(min[i])

        result.reverse()

        for(let i = 0; i < result.length; i++){
            if(result[i] < 0){
                result[i + 1] = result[i + 1] - 1
                result[i] += 10
            }
        }

        if((result.length > 1) && (result[result.length - 1] == 0)) 
            result.splice(result.length - 1, 1)
        if(operator) result.push('-')

        return result.reverse().join('')
    }

    mult(a, b){
        this.a = a.split('').reverse()
        this.b = b.split('').reverse()

        let result = []

        for (let i = 0; i < this.a.length; i++){
            for (let j = 0; j < this.b.length; j++){
                let value = this.a[i] * this.b[j]

                if(result[i + j]) result[i + j] += value
                else result[i + j] = value
            }
        }

        for (let i = 0; i < result.length; i++){
            let step = Math.floor(result[i] / 10)
            result[i] %= 10

            if(result[i + 1]) result[i + 1] += step
            else if (step != 0) result[i + 1] = step
        }

        return result.reverse().join('')
    }

    divide(a, b){
        let str1 = a
        let str2 = b

        let answer = '1'
        let result = []
        let i = 0
        let j = 0
        let diff = str1.length - str2.length
        let dop = 1

        if(diff > 3){
            do{
                dop = 10**(diff - 1)
                answer = this.subtract(str1, this.mult(str2, String(dop)))
                str1 = answer
                diff = str1.length - str2.length
                i++
                if(!result[j])
                    result[j] = ''
                result[j] = this.sum(result[j], this.mult('1', String(dop)))
            }
            while((diff > 3) && (Number(answer) != 0))

            i = 0
            j++
        }

        if(Number(answer) != 0){
            do{
                answer = this.subtract(str1, str2)
                str1 = answer
                i++
            }
            while(Number(answer) != 0)
        }
        if(!result[j])
            result[j] = ''
        result[j] = this.sum(result[j], String(i))

        if(result[1])
            return this.sum(result[0], result[1])
        else return result[0]
    }

    toEqual(diff){
        if(diff < 0){
            for(let i = diff; i < 0; i++)  
                this.a.unshift('0')
        }
        else if(diff > 0){
            for(let i = diff; i > 0; i--)  
                this.b.unshift('0')
        }
    }
}