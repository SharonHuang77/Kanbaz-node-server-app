// console.log("Hello World!");

export default function Hello(app) {
  const hello = (req, res) => {
    res.send('Life is good!')
  }
  const goodbye = (req, res) => {
    res.send('Goodbye')
  }
  const index = (req, res) => {
    res.send('Welcome to Full Stack Development!')
  }
  app.get('/hello', hello);
  app.get('/goodbye', goodbye);
  app.get('/', index);
}

