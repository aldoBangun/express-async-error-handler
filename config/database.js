const mongoose = require('mongoose')

module.exports = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false
      })

      console.log('Database connected...')
   } catch(err) {
      console.log(err)
   }
}