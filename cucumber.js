module.exports = {
  default: {
    require: ['features/step-definitions/**/*.js'],
    format: ['progress'],
    paths: ['features/**/*.feature'],
    parallel: 0,
    publishQuiet: true,
  }
};