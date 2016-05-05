var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

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
  kittens.increments('uid').primary();
  kittens.string('name');
}).then(function(table){
  console.log('created table')
})

var Kitten = bookshelf.Model.extend({
  tableName: 'kittens',
  idAttribute: 'uid'
})

//get all records
app.get('/', function (req, res){
  new Kitten().fetchAll()
              .then(function(cats){
                res.send(cats)
            }).catch(function(error){
                console.error(error)
                res.send('Error retrieving the cats')
            })
})

//get one record
app.get('/:id', function (req, res){
  Kitten.forge({'uid': req.params.id})
        .fetch()
        .then(function(cat){
          if(cat === null){
            res.send('No such record')
          } else {
          res.send(cat)
          }
      }).catch(function(error){
          console.error(error)
          res.send("Error retrieving your cat")
  })
})

//add a record
app.post('/', function (req, res){
  var cat = new Kitten({name: req.body.name})
  cat.save()
     .then(function(saved_cat){
        res.send(saved_cat.toJSON())
   }).catch(function(error){
        console.error(error)
        res.send('Error saving cat')
   })
})

//update a record
app.put('/:id', function (req, res){
  Kitten.where({'uid': req.params.id})
        .fetch()
        .then(function (cat){
          if (cat !== null){
            cat.save({name: req.body.name, uid: req.params.id}, {patch: true})
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

//delete a record
app.delete('/:id', function (req, res){
  Kitten.forge({uid: req.params.id})
        .destroy()
        .then(function(){
          res.send('Record deleted')
      }).catch(function(error){
          console.error(error)
          res.send('Failed to delete record')
      })
})

