(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tippy.js'), require('react'), require('prop-types'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'tippy.js', 'react', 'prop-types', 'react-dom'], factory) :
  (global = global || self, factory(global.Tippy = {}, global.tippy, global.React, global.PropTypes, global.ReactDOM));
}(this, function (exports, tippy, React, PropTypes, reactDom) { 'use strict';

  var tippy__default = 'default' in tippy ? tippy['default'] : tippy;
  var React__default = 'default' in React ? React['default'] : React;
  PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

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

  var useIsomorphicLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect;
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
    var ref = React.useRef();

    if (!ref.current) {
      ref.current = typeof initialValue === 'function' ? initialValue() : initialValue;
    }

    return ref.current;
  }
  function useSingletonCreate(component, props, enabled, deps) {
    useIsomorphicLayoutEffect(function () {
      var instances = component.instances;
      var instance = tippy.createSingleton(instances, props);
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

    var _useState = React.useState(false),
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
      var instance = tippy__default(component.ref, props);
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
    return React__default.createElement(React__default.Fragment, null, React.cloneElement(children, {
      ref: function ref(node) {
        component.ref = node;
        preserveRef(children.ref, node);
      }
    }), mounted && reactDom.createPortal(content, component.container));
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

  var Tippy$1 = React.forwardRef(function TippyWrapper(_ref2, _ref3) {
    var children = _ref2.children,
        props = _objectWithoutPropertiesLoose(_ref2, ["children"]);

    return React__default.createElement(Tippy, props, React.cloneElement(children, {
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
    return React.Children.map(children, function (child) {
      return React.cloneElement(child, {
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

  exports.tippy = tippy__default;
  exports.TippySingleton = TippySingleton;
  exports.default = Tippy$1;
  exports.useSingleton = useSingleton;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=tippy-react.umd.js.map
