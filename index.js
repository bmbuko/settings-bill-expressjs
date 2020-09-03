let express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require("./settings-bill");
var moment = require('moment');
moment().format();


let app = express();
const settingsBill = SettingsBill();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.get("/", function (req, res) {
  res.render("home", {
    callCost: settingsBill.getCallCost(),
    smsCost: settingsBill.getSmsCost(),
    theWarningLevel: settingsBill.getWarningLevel(),
    theCriticalLevel: settingsBill.getCriticalLevel(),
    callCostTotal: settingsBill.getTotalCallCost("call").toFixed(2),
    smsCostTotal: settingsBill.getTotalSmsCost("sms").toFixed(2),
    getTotalCost: settingsBill.getTotalCost().toFixed(2),
    color:settingsBill.totalClassName()



  })

});
app.post("/settings", function (req, res) {
  settingsBill.setCallCost(req.body.callCost);
  settingsBill.setSmsCost(req.body.smsCost);
  settingsBill.setWarningLevel(req.body.warningLevel);
  settingsBill.setCriticalLevel(req.body.criticalLevel);



  res.redirect("/")
})
app.post("/actions", function (req, res) {
  settingsBill.billType(req.body.actionType)

  res.redirect("/");

});
app.get("/actions", function (req, res) {

  var actionForAgo = settingsBill.action();
  for (var item of actionForAgo) {
    item.ago = moment(item.timestamp).fromNow()
  }
  res.render("actions", {
    actions: actionForAgo
  })

});
app.get("/actions/:actionType", function (req, res) {
  const actionType = req.params.actionType


  {
    var actionForAgo =settingsBill.actionsFor(actionType);
    for (var item of actionForAgo) {
      item.ago = moment(item.timestamp).fromNow()
    }
    res.render("actions", {
      actions:actionForAgo
      

    })
  }



});

let PORT = process.env.PORT || 3009;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
})