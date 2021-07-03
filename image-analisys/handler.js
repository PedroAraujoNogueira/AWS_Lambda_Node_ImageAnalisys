'use strict';

// sls invoke local -f img-analysis --path request.json
// sls invoke -f img-analysis --log
// sls deploy
// sls invoke -f img-analysis --path request.json --log

// Usamos o fs do Node quando estavamos pegando as imagens da pasta images.
// const { promises: { readFile }} = require('fs')
const { get } = require('axios')
class Handler {
  constructor({ rekoSvc, translatorSvc }){
    this.rekoSvc = rekoSvc
    this.translatorSvc = translatorSvc
  }
  async detectImageLabels(buffer){
    const result = await this.rekoSvc.detectLabels({
      Image: {
        Bytes: buffer
      }
    }).promise()

    const workingItens = result.Labels.filter(({ Confidence }) => 
      Confidence > 80
    )

    const names = workingItens.map(({ Name }) => Name).join(" and ")
  
    return { names, workingItens }
  }
  async translateText(text){
    const params = {
      SourceLanguageCode: 'en',
      TargetLanguageCode: 'pt',
      Text: text
    }

    const { TranslatedText } = await this.translatorSvc.translateText(params).promise()

    return TranslatedText.split(' e ')
  }
  formatTextResults(texts, workingItems){
    const finalText = []
    for(const indexText in texts){
      const nameInPortuguese = texts[indexText]
      const confidence = workingItems[indexText].Confidence
      finalText.push(`${confidence.toFixed(2)}% de ser do tipo ${nameInPortuguese}`)
    }

    return finalText.join('\n')
  }
  async getImageBuffer(imageUrl){
    const response = await get(imageUrl, {
      responseType: "arraybuffer"
    })

    const buffer = Buffer.from(response.data, 'base64')

    return buffer
  }
  async main(event){
    try {
      
      const { imageUrl } = event.queryStringParameters
      
      console.log('Downloading image...')
      // const imageBuffer = await readFile('./images/pessoa.jpeg')
      const imageBuffer = await this.getImageBuffer(imageUrl)

      console.log('Detecting Labels...')
      const { names, workingItens } = await this.detectImageLabels(imageBuffer)
      
      console.log('Translating to Portuguese...')
      const texts = await this.translateText(names)

      console.log('Handling final object...', texts , workingItens)
      const finalText = await this.formatTextResults(texts, workingItens)

      console.log('Finishing...')
      return {
        statusCode: 200,
        body: `A imagem tem\n ${finalText}` 
      }
    } catch (error) {
      console.log('Error***', error.stack)
      return {
        statusCode: 500,
        body: "Internal server error!"
      }
    }
  } 
}

const aws = require('aws-sdk')
const reko = new aws.Rekognition()
const translator = new aws.Translate()
const handler = new Handler({
  rekoSvc: reko,
  translatorSvc: translator
})


module.exports.main = handler.main.bind(handler)
