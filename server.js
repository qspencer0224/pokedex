const express = require("express");
const app = express();
const PORT = 3000;
require("dotenv").config();
const mongoose = require("mongoose");
const Pokemon = require("./models/Pokemon");
const pokemen = require("./models/pokemen");
const methodOverride = require("method-override");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Mongo Bongo, Lakers in 4");
});

app.use(express.json());
app.use((req, res, next) => {
  console.log("Running routes like TO");
  next();
});
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.json());

//what do we want to do first?

//we want a route to show ALL the POKEMON in our index
// app.get('/', async (req, res) =>{
//     try {
//         const allPokemon = await Pokemon.find({})
//         res.send(allPokemon)
//     } catch (error) {
//         console.log(err)
//         res.status(500).send('Server Error')
//     }
// })

//THE INDEX----shows all pokemon
app.get("/", async (req, res) => {
    const pokedata = await Pokemon.find({})
  res.render("Index", { pokemon: pokedata });
});

app.get("/addall", (req, res) => {
  pokemen.map(async (item, i) => {
    item.img=item.img + '.jpg'
    await Pokemon.create(item);
  });
  res.redirect("/");
});

app.get("/new", (req, res) => {
  res.render("New");
});
//THE CREATE NEW POKEMON PAGE----this will create a new pokemon ; its '/new' because its coming from the new page
app.post("/newsubmit", async (req, res) => {
  await Pokemon.create(req.body);
  res.redirect("/");
});

//we want to show/READ the pokemon's profile
app.get("/show/:id", async (req, res) => {
  const showPokemon = await Pokemon.findById(req.params.id);
  res.render("Show", { pokemon: showPokemon });
});

app.put('/editsubmit/:id', async (req, res) =>{
    await Pokemon.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/')
})

app.post('/edit/:id', async (req, res) =>{
    const updatedPokemon = await Pokemon.findById(req.params.id)
    res.render('Update', {updated: updatedPokemon})
})

//our pokemon should  take us to their edit page with would be attached to their name in the Index page component
//on that show page, whichever pokemon that was selected should have an id in the request attached that signifies its uniqueness

//we're deleting pokemon from our index page

app.delete("/delete/:id", async (req, res) => {
  await Pokemon.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

app.delete("/poof", async (req, res) => {
    await Pokemon.deleteMany({});
    res.redirect("/");
  });


app.listen(PORT, () => {
  console.log("LISTENING ON", PORT);
});
