# API para analisar imagens.  
### Como executar o projeto: 
-> Vá até a pasta demo03-image-analysis 
-> Digite no terminal "sls" ou "serverless" para inicializar um projeto serverless.
Crie um novo projeto chamado app-image-analisys e coloque o nome da sua função de image-analisys.  
-> Digite no terminal npm i para instalar as dependecias do projeto.  
-> Digite "sls deploy" para fazer deploy da sua aplicação.  
-> Digite "sls invoke local -f img-analysis --log" para invocar sua função localmente
ou "sls invoke -f img-analysis --log" para invocar sua função na nuvem.  
-> Pegue o endpoint gerado ao fazer deploy e acrescente a ele o query parameter imageUrl com o link de alguma imagem.  

### Descrição do projeto:  
O projeto é uma pequena aplicação serverless feita com Node, utilizando os serviços de Lambda, Rekognition e Translate da AWS. Nesse projeto é passada a URL de uma imagem no query parameter imageUrl e então o serviço rekognition da AWS vai analisar a imagem e me retornar um array com as possibilidades detectadas do que está contido na imagem, contendo também a porcentagem de confiança de cada possibilidade. Após isso é usado o serviço de translate para traduzir para português as possibilidades e então é mostrado para o usuário somente as opções com confiança acima de 80%. O deploy do projeto é feito
usando o serviço de lambda da AWS com a ajuda do serverless framework.  
O objetivo desse projeto é aprender como utilizar os serviços da AWS, assim como fazer deploy de aplicações serverless e as formas e os comandos utilizados para invocá-la.    

### Requisitos de software e bibliotecas:    
-> Node e NPM.  
-> Axios.    
-> Conta na AWS.  
-> Serverless Framework.  

### Links úteis:   
Documentação do Lambda AWS: https://aws.amazon.com/pt/lambda/   
Documentação do Rekognition da AWS: https://aws.amazon.com/pt/rekognition/resources/?nc=sn&loc=6  
Documentação do Translate da AWS: https://aws.amazon.com/pt/translate/   

