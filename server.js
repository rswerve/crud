var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname+'/'))

app.listen(5000, function(){
  console.log('Express listening on 5000')
})

var knex = require('knex')({
  client: 'sqlite3',
    connection: {
        filename: './hrtest.db'
    }
})

var bookshelf = require('bookshelf')(knex)

knex.schema.createTableIfNotExists('kittens', function(kittens){
  kittens.increments('uid').primary()
  kittens.string('name')
  kittens.string('address')
  kittens.integer('age')
}).then(function(table){
  console.log('created table')
})

var Kitten = bookshelf.Model.extend({
  tableName: 'kittens',
  idAttribute: 'uid'
})

app.get('/cats', function (req, res){
  new Kitten().fetchAll()
              .then(function(cats){
                res.send(cats)
            }).catch(function(error){
                console.error(error)
                res.send('Error retrieving the cats')
            })
})

app.post('/cats', function (req, res){
  var cat = new Kitten({
    name: req.body.name, 
    age: req.body.age, 
    address: req.body.address
  })
  cat.save()
     .then(function(saved_cat){
        res.send(saved_cat.toJSON())
   }).catch(function(error){
        console.error(error)
        res.send('Error saving cat')
   })
})

app.put('/cats/:id', function (req, res){
  Kitten.where({'uid': req.body.id})
        .fetch()
        .then(function (cat){
          if (cat !== null){
            cat.save(
              {
              name: req.body.name, 
              age: req.body.age, 
              address: req.body.address
              }, 
              {patch: true}
            )
            .then(function(updated_cat){
              res.send(updated_cat.toJSON())
            }).catch(function(error){
              console.error(error)
              res.send('Failed to update cat')
            })
          } else {
            res.send('No such record')
          }
        })
})

app.delete('/cats/:id', function (req, res){
  Kitten.forge({uid: req.params.id.slice(1)})
        .destroy()
        .then(function(){
          res.send('Record deleted')
      }).catch(function(error){
          console.error(error)
          res.send('Failed to delete cat')
      })
})

