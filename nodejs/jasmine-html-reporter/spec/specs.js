const Jasmine = require('jasmine');
const HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;
const jasmine = new Jasmine();
jasmine.loadConfigFile('./spec/support/jasmine.json');
jasmine.addReporter(new HtmlReporter({
    path: path.join(__dirname,'reports')
}));
jasmine.execute();