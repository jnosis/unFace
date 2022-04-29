const loaderUtils = require('loader-utils');
const path = require('path');

module.exports = function getCSSModuleLocalIdent(
  context,
  _localIdentName,
  localName
) {
  const { rootContext, resourcePath } = context;
  const fileOrFolderName = resourcePath.match(/index\.module\.css$/)
    ? '[folder]'
    : '[name]';

  const hash = loaderUtils.getHashDigest(
    path.posix.relative(rootContext, resourcePath) + localName,
    'md5',
    'base64',
    5
  );

  const className = loaderUtils
    .interpolateName(context, `${fileOrFolderName}_${localName}__${hash}`)
    .replace('.module_', '_');

  return className;
};
