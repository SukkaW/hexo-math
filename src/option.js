'use strict';

const DEFAULT_OPTS = module.exports.DEFAULT_OPTS = {
  engine: 'mathjax',
  mathjax: {
    src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js',
    config: {
      tex2jax: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
        processEscapes: true
      },
      TeX: {
        equationNumbers: {
          autoNumber: 'AMS'
        }
      }
    }
  },
  katex: {
    css: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.6.0/katex.min.css',
    js: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.6.0/katex.min.js',
    config: {
      throwOnError: false,
      errorColor: '#cc0000'
    }
  }
};

const ENGINES = [
  'mathjax',
  'katex'
];

module.exports.getOptions = function({ config, log }, opts) {
  if (config.mathjax === Object(config.mathjax)) {
    log.warn('[hexo-math] Deprecation Notice: configuration format changed since 3.0.0. Please move `mathjax` to `math.mathjax` in your site\'s `_config.yml` file');
    if (config.math !== Object(config.math)) config.math = { mathjax: config.mathjax };
  }

  opts = Object.assign({}, opts, config.math, DEFAULT_OPTS);

  if (ENGINES.indexOf(opts.engine) < 0) throw new TypeError('hexo-math does not support engine named \'opts.engine\'');

  log.info(`[hexo-math] Using engine '${opts.engine}'`);

  return opts;
};
