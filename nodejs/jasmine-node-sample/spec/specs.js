const Jasmine = require('jasmine');
const jasmine = new Jasmine();
const ConsoleReporter = require('jasmine-console-reporter');
const reporter = new ConsoleReporter({
    colors : 1,
    cleanStack: 1,
    verbosity : 4,
    listStyle : 'indent',
    activity: false,
    emoji: true,
    beep: true
});
jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.showColors(true);
jasmine.addReporter(reporter);
jasmine.execute();