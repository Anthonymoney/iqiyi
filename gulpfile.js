const gulp = require('gulp'); //加载gulp插件
const gulpsass = require('gulp-sass'); //编译sass
// const html = require('gulp-minify-html'); //压缩html
// const concat = require('gulp-concat'); //合并
// const uglify = require('gulp-uglify'); //压缩
// const rename = require('gulp-rename'); //重命名
// const watch = require('gulp-watch'); //添加此插件进行监听
// const imagemin = require('gulp-imagemin'); //图片压缩插件
// const babel = require('gulp-babel');
// const core = require('gulp-core');
// const presetes5 = require('gulp-preset-es2015');

//1.新建gulp任务
gulp.task('hehe', function () {
	console.log('hello,gulp11111');
});


//2.将开发目录下面的文件复制到线上目录(无需插件)
// gulp.task('copyfile',function(){
// 	gulp.src('src/*.html')//开发目录路径 *所有文件
// 	.pipe(gulp.dest('dist/'));//输出路径
// });


// 3.压缩html
// gulp.task('uglifyhtml', function () {
// 	return gulp.src('src/*.html')
// 		.pipe(html()) //执行压缩
// 		.pipe(gulp.dest('dist/'));
// });




//4.sass编译--gulp-sass
gulp.task('runsass', function () {
	return gulp.src('src/sass/*.scss')
		.pipe(gulpsass({
			outputStyle: 'compressed'
		})) //执行编译,compressed:压缩一行
		.pipe(gulp.dest('dist/css/'));
});


//5.合并
// gulp.task('alljs', function () {
// 	return gulp.src('src/script/js/*.js')
// 		.pipe(concat('all.js')) //合并以及重命名
// 		.pipe(gulp.dest('dist/js')) //输出
// });

//6.压缩
// gulp.task('uglifyjs', function () {
// 	return gulp.src('src/script/js/*.js')
// 		.pipe(uglify())
// 		.pipe(gulp.dest('dist/js'));
// })



//7.合并压缩js
// gulp.task('allminjs', function () {
// 	return gulp.src('src/script/js/*.js')
// 		.pipe(concat('all.js')) //合并以及重命名
// 		.pipe(gulp.dest('dist/js')) //输出
// 		.pipe(rename('all.min.js')) //重命名,为了后面压缩all.js
// 		.pipe(uglify()) //压缩
// 		.pipe(gulp.dest('dist/js'));
// });



//8.图片的压缩--png
//如果插件安装不成功，可以在清除缓存之后继续按照 npm cache clean --force
//npm cache clean --force
// gulp.task('runimg', function () {
// 	return gulp.src('src/img/*.png')
// 		.pipe(imagemin())
// 		.pipe(gulp.dest('dist/img/'));
// });


//7.es6转es5
//安装如下插件
//gulp-babel
//gulp-core
//gulp-preset-es2015
// gulp.task("babeljs", function () {
//     gulp.src("src/script/js/*.js")  
//     .pipe(babel({
//      	presets:['es2015']
//     }))
//     .pipe(gulp.dest("dist/"));  
//  });  
// gulp.task("watchjs",function(){
//     gulp.watch('js/index.js',function(){
//     	gulp.run('babeljs');
//     });
// });

//最终监听的写法
//监听里面的任务必须先跑一次。
// gulp.task('default',function(){
// 	watch(['src/*.html','src/sass/*.scss','src/js/*.js'],gulp.parallel('uglifyhtml','runsass','uglifyjs'));  
// 	//添加了 gulp.series 和 gulp.parallel 方法用于组合任务
// 	//watch的第一个参数监听的文件的路径，第二个参数是监听运行的任务名
// 	//gulp.parallel() –并行运行任务 
// 	//gulp.series() –运行任务序列,拥有先后顺序。 
// });

// //gulp对象下面的方法
// //1.task：新建任务。
// //2.src:引入文件的路径
// //3.dest:输出路径
// //4.watch:监听
// //5.pipe:流