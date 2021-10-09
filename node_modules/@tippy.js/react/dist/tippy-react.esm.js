import tippy, { createSingleton } from 'tippy.js';
export { default as tippy } from 'tippy.js';
import React, { useRef, useLayoutEffect, useEffect, forwardRef, cloneElement, useState, Children } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
function preserveRef(ref, node) {
  if (ref) {
    if (typeof ref === 'function') {
      ref(node);
    }

    if ({}.hasOwnProperty.call(ref, 'current')) {
      ref.current = node;
    }
  }
}
function ssrSafeCreateDiv() {
  return isBrowser && document.createElement('div');
}
function updateClassName(tooltip, action, classNames) {
  classNames.split(/\s+/).forEach(function (name) {
    if (name) {
      tooltip.classList[action](name);
    }
  });
}

var useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
function useUpdateClassName(component, className, deps) {
  useIsomorphicLayoutEffect(function () {
    var tooltip = component.instance.popperChildren.tooltip;

    if (className) {
      updateClassName(tooltip, 'add', className);
      return function () {
        updateClassName(tooltip, 'remove', className);
      };
    }
  }, [className].concat(deps));
}
function useInstance(initialValue) {
  // Using refs instead of state as it's recommended to not store imperative
  // values in state due to memory problems in React(?)
  var ref = useRef();

  if (!ref.current) {
    ref.current = typeof initialValue === 'function' ? initialValue() : initialValue;
  }

  return ref.current;
}
function useSingletonCreate(component, props, enabled, deps) {
  useIsomorphicLayoutEffect(function () {
    var instances = component.instances;
    var instance = createSingleton(instances, props);
    component.instance = instance;

    if (!enabled) {
      instance.disable();
    }

    return function () {
      instance.destroy();
      component.instances = instances.filter(function (i) {
        return !i.state.isDestroyed;
      });
    };
  }, deps);
}
function useSingletonUpdate(component, props, enabled) {
  useIsomorphicLayoutEffect(function () {
    if (component.renders === 1) {
      component.renders++;
      return;
    }

    var instance = component.instance;
    instance.setProps(props);

    if (enabled) {
      instance.enable();
    } else {
      instance.disable();
    }
  });
}

function Tippy(_ref) {
  var children = _ref.children,
      content = _ref.content,
      className = _ref.className,
      visible = _ref.visible,
      singleton = _ref.singleton,
      _ref$enabled = _ref.enabled,
      enabled = _ref$enabled === void 0 ? true : _ref$enabled,
      _ref$multiple = _ref.multiple,
      multiple = _ref$multiple === void 0 ? true : _ref$multiple,
      _ref$ignoreAttributes = _ref.ignoreAttributes,
      ignoreAttributes = _ref$ignoreAttributes === void 0 ? true : _ref$ignoreAttributes,
      __source = _ref.__source,
      __self = _ref.__self,
      restOfNativeProps = _objectWithoutPropertiesLoose(_ref, ["children", "content", "className", "visible", "singleton", "enabled", "multiple", "ignoreAttributes", "__source", "__self"]);

  var isControlledMode = visible !== undefined;
  var isSingletonMode = singleton !== undefined;

  var _useState = useState(false),
      mounted = _useState[0],
      setMounted = _useState[1];

  var component = useInstance(function () {
    return {
      container: ssrSafeCreateDiv(),
      renders: 1
    };
  });

  var props = _extends({
    ignoreAttributes: ignoreAttributes,
    multiple: multiple
  }, restOfNativeProps, {
    content: component.container
  });

  if (isControlledMode) {
    props.trigger = 'manual';
  }

  if (isSingletonMode) {
    enabled = false;
  }

  var deps = [children.type]; // CREATE

  useIsomorphicLayoutEffect(function () {
    var instance = tippy(component.ref, props);
    component.instance = instance;

    if (!enabled) {
      instance.disable();
    }

    if (visible) {
      instance.show();
    }

    if (isSingletonMode) {
      singleton(instance);
    }

    setMounted(true);
    return function () {
      instance.destroy();
    };
  }, deps); // UPDATE

  useIsomorphicLayoutEffect(function () {
    // Prevent this effect from running on 1st render
    if (component.renders === 1) {
      component.renders++;
      return;
    }

    var instance = component.instance;
    instance.setProps(props);

    if (enabled) {
      instance.enable();
    } else {
      instance.disable();
    }

    if (isControlledMode) {
      if (visible) {
        instance.show();
      } else {
        instance.hide();
      }
    }
  });
  useUpdateClassName(component, className, deps);
  return React.createElement(React.Fragment, null, cloneElement(children, {
    ref: function ref(node) {
      component.ref = node;
      preserveRef(children.ref, node);
    }
  }), mounted && createPortal(content, component.container));
}

if (process.env.NODE_ENV !== 'production') {
  var ContentType = PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.element]);
  Tippy.propTypes = {
    content: PropTypes.oneOfType([ContentType, PropTypes.arrayOf(ContentType)]).isRequired,
    children: PropTypes.element.isRequired,
    visible: PropTypes.bool,
    enabled: PropTypes.bool,
    className: PropTypes.string,
    singleton: PropTypes.func
  };
}

var Tippy$1 = forwardRef(function TippyWrapper(_ref2, _ref3) {
  var children = _ref2.children,
      props = _objectWithoutPropertiesLoose(_ref2, ["children"]);

  return React.createElement(Tippy, props, cloneElement(children, {
    ref: function ref(node) {
      preserveRef(_ref3, node);
      preserveRef(children.ref, node);
    }
  }));
});

function TippySingleton(_ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$enabled = _ref.enabled,
      enabled = _ref$enabled === void 0 ? true : _ref$enabled,
      _ref$ignoreAttributes = _ref.ignoreAttributes,
      ignoreAttributes = _ref$ignoreAttributes === void 0 ? true : _ref$ignoreAttributes,
      restOfNativeProps = _objectWithoutPropertiesLoose(_ref, ["children", "className", "enabled", "ignoreAttributes"]);

  var component = useInstance({
    instances: [],
    renders: 1
  });

  var props = _extends({
    ignoreAttributes: ignoreAttributes
  }, restOfNativeProps);

  var deps = [children.length];
  useSingletonCreate(component, props, enabled, deps);
  useSingletonUpdate(component, props, enabled);
  useUpdateClassName(component, className, deps);
  return Children.map(children, function (child) {
    return cloneElement(child, {
      enabled: false,
      onCreate: function onCreate(instance) {
        if (child.props.onCreate) {
          child.props.onCreate(instance);
        }

        component.instances.push(instance);
      }
    });
  });
}

if (process.env.NODE_ENV !== 'production') {
  TippySingleton.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired
  };
}

function useSingleton(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      className = _ref.className,
      _ref$enabled = _ref.enabled,
      enabled = _ref$enabled === void 0 ? true : _ref$enabled,
      _ref$ignoreAttributes = _ref.ignoreAttributes,
      ignoreAttributes = _ref$ignoreAttributes === void 0 ? true : _ref$ignoreAttributes,
      restOfNativeProps = _objectWithoutPropertiesLoose(_ref, ["className", "enabled", "ignoreAttributes"]);

  var component = useInstance({
    instance: null,
    instances: [],
    renders: 1
  });

  var props = _extends({
    ignoreAttributes: ignoreAttributes
  }, restOfNativeProps);

  var deps = [component.instances.length];
  useSingletonCreate(component, props, enabled, deps);
  useSingletonUpdate(component, props, enabled);
  useUpdateClassName(component, className, deps);
  return function (instance) {
    component.instances.push(instance);
  };
}

export default Tippy$1;
export { TippySingleton, useSingleton };
//# sourceMappingURL=tippy-react.esm.js.map
