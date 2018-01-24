const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const stylus = require("stylus");
const chalk = require("chalk");
const mongoose = require("mongoose");

const index = require("./routes/index");
const users = require("./routes/users");
const config = require("./config");

const app = express();


mongoose.connect(config.connection);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(logger(`${chalk.bold(":remote-addr")} - ${chalk.green(":remote-user")} ${chalk.magenta("[:date[clf]]")} "${chalk.blue(":method") }${chalk.red(":url")} HTTP/${chalk.yellow(":http-version")}" ${chalk.green(":status")} :res[content-length] ${chalk.bold('":referrer"')} ":user-agent"`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/users", users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
