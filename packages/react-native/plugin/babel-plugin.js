const PACKAGE_NAME = '@nativescript/react-native';

function isDirectiveFunction(path) {
  const body = path.node.body;
  if (!body || body.type !== 'BlockStatement') {
    return null;
  }

  const directives = body.directives || [];
  for (const directive of directives) {
    const value = directive.value && directive.value.value;
    if (value === 'use ui') {
      return 'ui';
    }
    if (value === 'use js') {
      return 'js';
    }
  }
  return null;
}

function isNativeScriptSource(value) {
  return value === PACKAGE_NAME;
}

function findNativeScriptIdentifier(programPath, t) {
  for (const statement of programPath.get('body')) {
    if (!statement.isImportDeclaration()) {
      continue;
    }
    if (!isNativeScriptSource(statement.node.source.value)) {
      continue;
    }
    for (const specifier of statement.node.specifiers) {
      if (
        t.isImportDefaultSpecifier(specifier) ||
        t.isImportNamespaceSpecifier(specifier)
      ) {
        return specifier.local.name;
      }
    }
  }

  for (const statement of programPath.get('body')) {
    if (!statement.isVariableDeclaration()) {
      continue;
    }
    for (const declaration of statement.node.declarations) {
      if (!t.isIdentifier(declaration.id)) {
        continue;
      }
      const init = declaration.init;
      if (
        t.isCallExpression(init) &&
        t.isIdentifier(init.callee, {name: 'require'}) &&
        init.arguments.length === 1 &&
        t.isStringLiteral(init.arguments[0], {value: PACKAGE_NAME})
      ) {
        return declaration.id.name;
      }
      if (
        t.isMemberExpression(init) &&
        !init.computed &&
        t.isIdentifier(init.property, {name: 'default'}) &&
        t.isCallExpression(init.object) &&
        t.isIdentifier(init.object.callee, {name: 'require'}) &&
        init.object.arguments.length === 1 &&
        t.isStringLiteral(init.object.arguments[0], {value: PACKAGE_NAME})
      ) {
        return declaration.id.name;
      }
    }
  }

  return null;
}

function ensureNativeScriptIdentifier(programPath, state, t) {
  if (state.nativeScriptIdentifier) {
    return state.nativeScriptIdentifier;
  }

  const existing = findNativeScriptIdentifier(programPath, t);
  if (existing) {
    state.nativeScriptIdentifier = existing;
    return existing;
  }

  const identifier = programPath.scope.generateUidIdentifier('NativeScript');
  state.nativeScriptIdentifier = identifier.name;

  if (programPath.node.sourceType === 'script') {
    const moduleIdentifier =
      programPath.scope.generateUidIdentifier('NativeScriptModule');
    programPath.unshiftContainer(
      'body',
      t.variableDeclaration('const', [
        t.variableDeclarator(
          moduleIdentifier,
          t.callExpression(t.identifier('require'), [
            t.stringLiteral(PACKAGE_NAME),
          ]),
        ),
        t.variableDeclarator(
          identifier,
          t.logicalExpression(
            '||',
            t.memberExpression(moduleIdentifier, t.identifier('default')),
            moduleIdentifier,
          ),
        ),
      ]),
    );
  } else {
    programPath.unshiftContainer(
      'body',
      t.importDeclaration(
        [t.importDefaultSpecifier(identifier)],
        t.stringLiteral(PACKAGE_NAME),
      ),
    );
  }

  return identifier.name;
}

function isAlreadyWrapped(path, t) {
  const parent = path.parentPath;
  if (!parent || !parent.isCallExpression()) {
    return false;
  }
  const callee = parent.node.callee;
  return (
    t.isMemberExpression(callee) &&
    !callee.computed &&
    t.isIdentifier(callee.property) &&
    (callee.property.name === 'uiInvoker' ||
      callee.property.name === 'jsInvoker')
  );
}

function wrapDirectiveFunction(path, state, t) {
  const policy = isDirectiveFunction(path);
  if (!policy || isAlreadyWrapped(path, t)) {
    return;
  }

  const programPath = path.findParent((parentPath) => parentPath.isProgram());
  const nativeScriptIdentifier = ensureNativeScriptIdentifier(programPath, state, t);
  const original = path.node;
  path.replaceWith(
    t.callExpression(
      t.memberExpression(
        t.identifier(nativeScriptIdentifier),
        t.identifier(policy === 'ui' ? 'uiInvoker' : 'jsInvoker'),
      ),
      [original],
    ),
  );
  path.skip();
}

module.exports = function nativeScriptReactNativeBabelPlugin({types: t}) {
  return {
    name: 'nativescript-react-native-thread-directives',
    visitor: {
      Program(path, state) {
        state.nativeScriptIdentifier = findNativeScriptIdentifier(path, t);
      },
      ArrowFunctionExpression(path, state) {
        wrapDirectiveFunction(path, state, t);
      },
      FunctionExpression(path, state) {
        wrapDirectiveFunction(path, state, t);
      },
    },
  };
};

module.exports.default = module.exports;
