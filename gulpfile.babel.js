const { src, dest, parallel, series, watch } = require('gulp');
// Server
const browserSync = require('browser-sync').create();
const webpack = require('webpack-stream')
// Styles
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
// Scripts
const uglify = require('gulp-uglify-es').default;
// Templates
const nunjucksRender = require('gulp-nunjucks-render');
const deepmerge  = require('deepmerge');
const loremIpsum = require('lorem-ipsum');
const cleanhtml = require('gulp-cleanhtml');
// Images
const imagecomp = require('compress-images');
const clean = require('gulp-clean');
// Deploy
const ghPages = require('gh-pages');
const path = require('path');

/**
 * Override nunjucks environment
 * @param {*} env - nunjucks env instance
 */
function nunjucksEnv(env) {
    const envGlobals = {
        Helpers: {
            /**
             * Merge two objects/arrays.
             * @param {object} x - object to merge (default settings).
             * @param {object} y - object to merge (custom settings).
             * @param {object} options - arrayMerge settings.
             */
            merge: (x, y, options) => {
                return deepmerge(x, y, {
                    arrayMerge: (destArr, sourceArr, options) => sourceArr
                })
            },

            /**
             * Generate random value in range.
             * @param {min} - minimal range value.
             * @param {max} - maximal range value.
             */
            random: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

            /**
             * Split string to array by separator
             * @param {string} str - string to split.
             * @param {string} separator - string separator for split.
             */
            split: (str, separator) => str.split(separator),
        },

        /**
         * Generate random lorem ipsum text.
         * More options here: https://www.npmjs.com/package/lorem-ipsum
         *
         * @param {string} count - Number of words, sentences, or paragraphs to generate.
         * @param {string} units - units for lorem generation, can be 'words', 'sentences', or 'paragraphs'.
         * @param {boolean} makeSentence - Capitalize words.
         * @param {number} sentenceLowerBound - Minimum words per sentence.
         * @param {number} sentenceUpperBound - Maximum words per sentence.
         * @param {string} format - Plain text or html.
         */
        lorem: (count = '10', units = 'sentences', makeSentence = false, sentenceLowerBound = 5, sentenceUpperBound = 15, format = 'html') => {
            const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

            const str = loremIpsum.loremIpsum({
                count,
                units,
                sentenceLowerBound,
                sentenceUpperBound,
                format,
            });

            return units === 'words' && makeSentence ? `${capitalize(str)}.` : str;
        },
    };

    for (const globalName in envGlobals) {
        env.addGlobal(globalName, envGlobals[globalName]);
    }
}

/**
 * 📝 BrowserSync
 */
function browsersync() {
    browserSync.init({
        server: { baseDir: 'dist/' },
        notify: false,
        online: true
    });
}

/**
 * 📝 Styles
 */
function styles() {
    return src('src/scss/main.scss')
        .pipe(sass())
        .pipe(concat('main.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(cleancss(({
            level: {
                1: { specialComments: 0 }
            }
        })))
        .pipe(dest('dist/css/'))
        .pipe(browserSync.stream());
}

/**
 * 📝 Scripts
 */
function scripts() {
    return src('src/js/core.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(uglify())
        .pipe(dest('dist/js/'))
        .pipe(browserSync.stream());
}

/**
 * 📝 Templates
 */
function views() {
    return src('src/views/pages/*.njk')
        .pipe(nunjucksRender({
            path: ['./src/'],
            ext: '.html',
            manageEnv: nunjucksEnv
        }))
        .pipe(cleanhtml())
        .pipe(dest('dist/'))
        .pipe(browserSync.stream());
}

/**
 * 📝 Fonts
 */
function fonts() {
    return src('src/fonts/**/*.*')
        .pipe(dest('dist/fonts/'))
        .pipe(browserSync.stream());
}

function fontawesome() {
    return src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(dest('dist/fonts/fontawesome/'))
        .pipe(browserSync.stream());
}

/**
 * 📝 Icons
 */
function icons() {
    return src('src/icons/**/*.*')
        .pipe(dest('dist/icons/'))
        .pipe(browserSync.stream());
}

/**
 * 📝 Compress images
 */
async function images() {
    imagecomp(
        'src/images/**/*',
        'dist/images/',
        { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: 'mozjpeg', command: ['-quality', '75'] } },
        { png: { engine: 'pngquant', command: ['--quality=75-100', '-o'] } },
        { svg: { engine: 'svgo', command: '--multipass' } },
        { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } },
        function (err, completed) {
            if (completed === true) {
                browserSync.reload()
            }
        }
    )
}

/**
 * 📝 Delete images
 */
function cleanimg() {
    return src('dist/images/**/*', { allowEmpty: true })
        .pipe(clean());
}

/**
 * 📝 Clean Dist folder
 */
function cleandist() {
    return src('dist', { allowEmpty: true })
        .pipe(clean());
}

/**
 * 📝 Deploy to GitHub Pages
 */
function deploy(cb) {
    ghPages.publish(path.join(process.cwd(), './dist'), cb);
}

/**
 * 📝 Watch
 */
function startwatch() {
    watch(['src/**/*.scss'], styles);
    watch(['src/**/*.js', '!src/**/*.bundle.js'], scripts);
    watch(['src/**/*.njk'], views);
    watch(['src/fonts/**/*'], fonts);
    watch(['src/icons/**/*'], icons);
    watch('src/images/**/*', images);
}

/**
 * 📝 Export
 */
exports.browsersync = browsersync;
exports.styles = styles;
exports.scripts = scripts;
exports.views = views;
exports.fonts = fonts;
exports.fontawesome = fontawesome;
exports.icons = icons;
exports.images = images;
exports.cleanimg = cleanimg;
exports.cleandist = cleandist;
exports.deploy = deploy;
exports.build = series(cleandist, scripts, styles, views, fonts, fontawesome, icons, images);

exports.default = parallel(scripts, styles, views, fonts, fontawesome, icons, images, browsersync, startwatch);