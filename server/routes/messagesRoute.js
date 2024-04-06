const { getAllMssg, addMssg } = require("../controllers/messagesController");
  
  const router = require("express").Router();
  
  router.post("/addmssg", addMssg);
  router.post("/getmssg", getAllMssg);
  
  module.exports = router;
  
