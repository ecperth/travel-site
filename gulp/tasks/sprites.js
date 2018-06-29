var gulp = require('gulp'),
    sprite = require('gulp-svg-sprite'),
    rename = require('gulp-rename'),
    del = require('del'),
    svg2png = require('gulp-svg2png');

    var config = {
        shape: {
            spacing: {
                padding: 1
            }
        },
        mode: {
            css: {
                variables:{
                    replaceSvgWithPng: function() {
                        return function(sprite, render){
                            return render(sprite).split('.svg').join('.png');
                        }
                    }
                },
                sprite: 'sprite.svg',
                render: {
                    css: {
                        template: './gulp/templates/sprite.css'
                    }
                }
            }
        }
    }

    gulp.task('beginClean', function(){
        return del(['./app/temp/sprite', './app/assets/images/sprites']);
    });

    gulp.task('createSprite',['beginClean'], function(){
        return gulp.src('./app/assets/images/icons/**/*.svg')
            .pipe(sprite(config))
            .pipe(gulp.dest('./app/temp/sprite/'));
    });

    gulp.task('createPng', ['createSprite'], function(){
        return gulp.src('./app/temp/sprite/css/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('./app/temp/sprite/css'));
    })

    gulp.task('copySpriteGraphic', ['createPng'], function(){
        return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
            .pipe(gulp.dest('./app/assets/images/sprites'));
    });

    gulp.task('copySpriteCSS', ['createSprite'] , function() {
        return gulp.src('./app/temp/sprite/css/*.css')
            .pipe(rename('_sprite.css'))
            .pipe(gulp.dest('./app/assets/styles/modules'));
    });

    gulp.task('endClean', ['copySpriteCSS', 'copySpriteGraphic'], function(){
        return del('./app/temp/sprite');
    });

    gulp.task('icons', ['beginClean', 'createSprite', 'createPng', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);