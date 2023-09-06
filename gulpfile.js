// --------------------------------------------------
// Load Plugins
// --------------------------------------------------

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  browserSync = require('browser-sync'),
  beeper = require('beeper'),
  childprocess = require('child_process'),
  sourcemaps = require('gulp-sourcemaps'),
  merge = require('merge-stream'),
  spritesmith = require('gulp.spritesmith'),
  pa11y = require('pa11y'),
  fancyLog = require('fancy-log'),
  chalk = require('chalk');

// --------------------------------------------------
// General Config
// --------------------------------------------------

var config = {
  baseURL: 'http://flat-base.html.ohodev.com/',
  // the jekyll site destination
  docRoot: '_site/',
  // main scss files that import partials
  scssSrc: 'assets/scss/**/*.scss',
  // all scss files in the scss directory
  allScss: 'assets/scss/**/*.scss',
  // the destination directory for our css
  cssDest: 'assets/css/',
  // all js files the js directory
  allJs: 'assets/js/**/*.js',
  // all fonts
  allFonts: 'assets/fonts/*',
  //URL that will be run though automated tests
  urls: [
    { "url": "" },
    { "url": "pages/basic-page.html" },
  ],
};

// --------------------------------------------------
// Custom Messages
// --------------------------------------------------

/**
 * Adding custom messages to output to the browserSync status
 */
var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> jekyll build',
  sassBuild: '<span style="color: grey">Running:</span> sass'
};

// --------------------------------------------------
// Jekyll
// --------------------------------------------------

/**
 * Build the Jekyll Site
/**
*/
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);

  if (process.platform === 'win32') {
    return childprocess.spawn('jekyll.bat', ['build'], { stdio: 'inherit' }).on('close', done);
  }
  else {
    return childprocess.spawn('bundle', ['exec', 'jekyll', 'build'], {
      stdio: 'inherit'
    })
      .on('close', done);
  }
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

// --------------------------------------------------
// Browser Sync
// --------------------------------------------------

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function () {
  browserSync({
    host: "localhost",
    server: {
      baseDir: config.docRoot
    },
    //proxy: config.devUrl,
    xip: true,
    open: false,
    notify: false,
    ui: false
  });
});

// --------------------------------------------------
// Sass
// --------------------------------------------------

/**
 * Compile scss files from into both:
 *   _site/assets/css (for live injecting)
 *   assets/css (for future jekyll builds)
 */
gulp.task('sass', function () {
  browserSync.notify(messages.sassBuild);
  return gulp.src(config.scssSrc)
    .pipe(plumber({
      errorHandler: function (err) {
        beeper();
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass(
      {
        errLogToConsole: true,
        includePaths: [
          './assets/libraries/@fortawesome/fontawesome-pro/scss',
          './assets/libraries/foundation-sites/scss',
        ]
      }
    ))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('../maps'))
    // for live injecting
    .pipe(gulp.dest(config.docRoot + config.cssDest))
    .pipe(browserSync.reload({
      stream: true
    }))
    // for future jekyll builds
    .pipe(gulp.dest(config.cssDest))
    .pipe(notify({
      message: "SCSS task complete",
      onLast: true
    }));
});

// --------------------------------------------------
// CSS Sprites
// --------------------------------------------------

gulp.task('sprite', function () {
  var spriteData = gulp.src('assets/img/sprite-source/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    retinaSrcFilter: ['assets/img/sprite-source/*-2x.png'],
    retinaImgName: 'sprite-2x.png',
    imgPath: '/assets/img/sprite.png',
    retinaImgPath: '/assets/img/sprite-2x.png',
    cssVarMap: function (sprite) {
      sprite.name = 'sprite-' + sprite.name;
    }
  }));

  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    .pipe(gulp.dest('assets/img/'));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    .pipe(gulp.dest('assets/scss/generated/'));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});


// --------------------------------------------------
// Accessibility
// --------------------------------------------------

// Adapted from Source:
// https://nystudio107.com/blog/a-gulp-workflow-for-frontend-development-automation

// Process data in an array synchronously, moving onto the n+1 item only after the nth item callback
function doSynchronousLoop(data, processData, done) {
  if (data.length > 0) {
    var loop = function loop(data, i, processData, done) {
      processData(data[i], i, function () {
        if (++i < data.length) {
          loop(data, i, processData, done);
        } else {
          done();
        }
      });
    };
    loop(data, 0, processData, done);
  } else {
    done();
  }
}

// Run pa11y accessibility tests on each template
function processAccessibility(element, i, callback) {
  var accessibilitySrc = config.baseURL + element.url;
  var cliReporter = require('./node_modules/pa11y/reporter/cli.js');
  var options = {
    log: cliReporter,
    ignore: [
      'notice',
      'warning',
      'WCAG2AA.Principle1.Guideline1_4.1_4_3.G145.Fail', //color contrast
      'WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail', //color contrast
    ]
  };
  var test = pa11y(options);

  fancyLog("-> Checking Accessibility for URL: " + chalk.cyan(accessibilitySrc));
  test.run(accessibilitySrc, function (error, results) {
    cliReporter.results(results, accessibilitySrc);
    callback();
  });
}

// accessibility task
gulp.task("a11y", function (callback) {
  doSynchronousLoop(config.urls, processAccessibility, function () {
    // all done
    callback();
  });
});

// --------------------------------------------------
// Favicon Generator
// --------------------------------------------------

var realFavicon = require('gulp-real-favicon');
var fs = require('fs');

// File where the favicon markups are stored
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function (done) {
  realFavicon.generateFavicon({
    masterPicture: './assets/favicons/favicon-master.svg',
    dest: './assets/favicons',
    iconsPath: './assets/favicons',
    design: {
      ios: {
        pictureAspect: 'noChange',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true
        }
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#da532c',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false
          }
        }
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#ffffff',
        manifest: {
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false,
      readmeFile: false,
      htmlCodeFile: false,
      usePathAsIs: false
    },
    markupFile: FAVICON_DATA_FILE
  }, function () {
    done();
  });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function () {
  return gulp.src(['/_includes/head.html'])
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(gulp.dest('/_includes/head.html'));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function (done) {
  var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function (err) {
    if (err) {
      throw err;
    }
  });
});

// --------------------------------------------------
// Watch
// --------------------------------------------------

/**
 * Watch scss files for changes & recompile
 * Watch html, md, and js files, run jekyll & reload browserSync
 */
gulp.task('watch', function () {
  gulp.watch(['assets/img/sprite-source/*.png'], ['sprite']);
  gulp.watch([config.allScss, 'assets/img/sprite-source/*.png'], ['sass']);
  // gulp.watch(['index.html', 'glossary.html', "functional-glossary.html", 'overview.html', 'pages/*.html', 'glossary/*.html', 'functional-glossary/*.html', 'pages/components/*.html', '_data/*', '_includes/**/*', '_layouts/*.html', config.allJs, config.allFonts], ['jekyll-rebuild']);
  gulp.watch(['index.html', 'glossary.html', "functional-glossary.html", 'overview.html', 'pages/*.html', 'glossary/*.html', 'functional-glossary/*.html', 'pages/components/*.html', '_data/*', '_includes/**/*', '_layouts/*.html', config.allJs, config.allFonts]);
});

// --------------------------------------------------
// Default
// --------------------------------------------------

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch browserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
