# sentry-upload-helper

## source map 上传助手 for Sentry

```javascript
const SentryHelper = require('sentry-upload-helper');

new SentryHelper({
    // 必要配置:
    include: ['dist/js'],      // js和.map文件所在的目录
 
    // 可选配置项:
    release: '',               // 和sentry客户端初始化时候的release相对应，默认当前git的hash作为release
    ignore: ['node_modules'],  // globs for files to ignore
    ignoreFile: null,          // path to a file with ignore rules
    rewrite: false,            // preprocess sourcemaps before uploading
    sourceMapReference: true,  // add a source map reference to source files
    stripPrefix: [],           // remove certain prefices from filenames
    stripCommonPrefix: false,  // guess common prefices to remove from filenames
    validate: false,           // validate source maps and cancel the upload on error
    urlPrefix: '',             // add a prefix source map urls after stripping them
    urlSuffix: '',             // add a suffix source map urls after stripping them
    ext: ['js', 'map', 'jsbundle', 'bundle'],  // override file extensions to scan for
});
```

在根目录添加配置授权文件 .sentryclirc
```
[defaults]
org = organization名字
project = project名字
url = https://xxx.xxx.com/

[auth]
token = 授权token
```