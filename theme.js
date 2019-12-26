var fs = require('fs')
const adobeSourcePath = '/Users/mojave27/dev/code/themes/junk'
const newThemePath = '/Users/mojave27/dev/code/themes/newTheme.js'

const readFile = () => {
    if (fs.existsSync(adobeSourcePath)) {
        var data = fs.readFileSync(adobeSourcePath, 'utf8')
        return data
    } else {
        throw new Error('read file failure.')
    }
}

const getHexCodes = data => {
    let hexCodes = []
    let ar = data.split("/*")
    let tempArray = ar[1].split("hex")
    tempArray.forEach(line => {
        if (line.includes('color: #')) {
            let index = line.indexOf('#')
            let hexCode = line.substring(index, index + 7)
            hexCodes.push(hexCode)
        }
    })
    return hexCodes
}

const getRgbaCodes = data => {
    let rgbaCodes = []
    let dataArray = data.split("/*")
    let rgbaArray = dataArray[2].split("-rgba")
    rgbaArray.forEach(line => {
        if (line.includes('color: rgba')) {
            let startIndex = line.indexOf('rgba')
            let endIndex = line.indexOf('1);')
            let rgbaCode = 'buildRgba' + line.substring(startIndex+4, endIndex) +'alpha)' 
            rgbaCodes.push(rgbaCode)
        }
    })
    return rgbaCodes
}

const buildFileData = (hexCodes, rgbCodes) => {
    const textColors = ['5', '5', '5', '1', '1']
    
    let OPEN = 'export const theme = {\n'
    let colors = ''
    let CLOSE = '}'
    
    for(let i = 0; i < 5; i++) {
        let colorName = `color${i+1}`
        console.log(`colorName: ${colorName}`)

        let color = `\t${colorName}: {\n` + 
        `\t\thex: '${hexCodes[i]}',\n` + 
        `\t\trgba: alpha => ${rgbCodes[i]}\n` + 
        `\t},\n` + 
        `\tget ${colorName}_text() {\n` +
        `\t\treturn this.color${textColors[i]}\n` +
        `\t},\n` 
        tmpColors = colors.concat('',color)
        colors = tmpColors
    }
    
    let fileData = OPEN + colors + CLOSE
    return fileData
}

const writeFile = data => {
    fs.writeFile(newThemePath, data, err => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
    })
}


const main = async () => {
    console.log(`reading in source file`)
    let data = await readFile()
    console.log(`generating hex codes`)
    let hexCodes = getHexCodes(data)
    console.log(`generating RGB codes`)
    let rgbCodes = getRgbaCodes(data)
    console.log(`generating js theme`)
    let fileData = buildFileData(hexCodes, rgbCodes)
    console.log(`hexCodes: ${hexCodes}`)
    // console.log(`rgbCodes: ${rgbCodes}`)
    // console.log(`\n${fileData}`)
    console.log(`writing to js theme file`)
    writeFile(fileData)
    console.log(`done.  See ${newThemePath} to view the new js theme.`)
}


main()
