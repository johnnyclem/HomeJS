module.exports = 
{ "development":
  { "driver":   "mongodb"
  , "url":     "mongodb://localhost/homejs_dev"
  }
, "test":
  { "driver":   "memory"
  }
, "production":
  { "driver":   "mongodb"
  , "url":     process.env.DB_CONNECTION_STRING
  }
};
