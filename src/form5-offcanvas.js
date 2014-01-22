
(function() {
  'use strict';
  var pluginName = 'offcanvas',
    defaults = {
      toggle: '.toggle-canvas',
      canvas: ['main'],
      open: function(){},
      close: function(){},
      init: function(){},
      debug: false
    };


  $[pluginName] = function (element, options) {
    this.element = element;
    this.$offcanvas = $(element);

    this.options = $.extend({}, defaults, options);
    this.debug = this.options.debug;

    this._defaults = defaults;
    this._name = pluginName;

    var initCB = $.Callbacks('stopOnFalse');
    initCB.add($.proxy(this.initialize,this));
    if (typeof this.options.init === 'function') {
      initCB.add($.proxy(this.options.init,this));
    }
    initCB.fire();
  };

  $[pluginName].prototype = {
    initialize: function() {
      if (this.debug) console.log('init offcanvas', this);

      this.$offcanvas.attr('alive',true);
      this.processSelectors();
      this.attachEvents();
      this.setSizes();
    },

    toggle: function(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (this.state.open) {
        return this.close();
      } else {
        return this.open();
      }
    },

    open: function() {
      if (this.debug) console.log('open offcanvas', this);
      var openCB = $.Callbacks('stopOnFalse');

      openCB.add($.proxy(function() {
        this.state.open = true;

        this.setBodyPosition(this.$offcanvas.data('width'));
        this.state.position = this.$offcanvas.data('width');

        this.$offcanvas.css({'-webkit-overflow-scrolling': 'touch'});
        this.$offcanvas.attr('active',true);

        this.el.toggle.attr('active',true);
        this.el.toggle.attr('moving',true);

        setTimeout($.proxy(function() {
          this.el.toggle.attr('moving',false);
          this.el.toggle.attr('open',true);
        }, this), 250);
      },this));
      if (typeof this.options.open === 'function') {
        openCB.add($.proxy(this.options.open,this));
      }
      openCB.fire();
    },

    close: function() {
      if (this.debug) console.log('close offcanvas', this);
      var closeCB = $.Callbacks('stopOnFalse');

      closeCB.add($.proxy(function() {
        this.state.open = false;

        this.setBodyPosition(0);
        this.state.position = 0;

        this.$offcanvas.css({'-webkit-overflow-scrolling': ''});
        this.$offcanvas.attr('active',false);

        this.el.toggle.attr('active',false);
        this.el.toggle.attr('moving',true);

        setTimeout($.proxy(function() {
          this.el.toggle.attr('moving',false);
          this.el.toggle.attr('open',false);
        }, this), 250);
      },this));
      if (typeof this.options.close === 'function') {
        closeCB.add($.proxy(this.options.close,this));
      }
      closeCB.fire();
    },

    setBodyPosition: function(num) {
      $.each(this.el.canvas, $.proxy(function(index, el) {
        $(el).css(this.css.translate(num));
        if (!$('html').hasClass('noscroll') ? num > 0 : void 0) {
          $('html,body').addClass('noscroll');
        }
        if ($('html').hasClass('noscroll') ? num === 0 : void 0) {
          $('html,body').removeClass('noscroll');
        }
      }, this));

    },

    processSelectors: function() {
      this.el = {};

      this.el.toggle = this.options.toggle;
      if (typeof this.el.toggle === 'string') {
        this.el.toggle = $(this.el.toggle);
      }

      if (typeof this.options.canvas === 'object' && typeof this.options.canvas[0] === 'string') {
        this.el.canvas = [];
        $.each(this.options.canvas, $.proxy(function(index, el) {
          this.el.canvas.push($(el));
          $(el).attr('canvas',true);
        }, this));
      } else {
        this.el.canvas = false;
      }
    },

    attachEvents: function() {
      $(window).on('toggleCanvas', $.proxy(this.toggle,this));

      this.el.toggle.on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        $(window).trigger('toggleCanvas');
      });

      this.resizeTimeout = 0;
      $(window).on('offCanvasResize', $.proxy(this.onResize, this));
      $(window).on('resize scroll', function() {
        $(window).trigger('offCanvasResize');
      }).trigger('resize');
    },

    onResize: function() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout($.proxy(function() {
        this.setSizes();
        if (this.el.toggle.css('display') === 'none' && this.state.open) {
          return this.close();
        }
      }, this, 100));
    },

    setSizes: function() {
      if (window.innerHeight) {
        this.$offcanvas.css('height',window.innerHeight);
        this.el.canvas[0].css('min-height', window.innerHeight);
      } else {
        this.$offcanvas.css('height',$(window).height());
        this.el.canvas[0].css('min-height', $(window).height());
      }
      if (this.$offcanvas.css('left') === '0px') {
        this.$offcanvas.data('side', 'left');
      }
      if (this.$offcanvas.css('right') === '0px') {
        this.$offcanvas.data('side', 'right');
      }
      this.$offcanvas.data('width', parseInt(this.$offcanvas.css('min-width'), 10));
      if (this.$offcanvas.data('side') === 'right') {
        this.$offcanvas.data('width', -this.$offcanvas.data('width'));
      }
      if (this.state.open) {
        return this.setBodyPosition(this.$offcanvas.data('width'));
      }
    },

    state: {
      open: false,
      position: 0
    },

    css: {
      translate: function(value) {
        return {
          '-webkit-transform': 'translate3d(' + value + 'px,0,0)',
          '-moz-transform': 'translate3d(' + value + 'px,0,0)',
          '-ms-transform': 'translate3d(' + value + 'px,0,0)',
          '-o-transform': 'translate3d(' + value + 'px,0,0)',
          'transform': 'translate3d(' + value + 'px,0,0)'
        };
      }
    },

    destroy: function() {
      if (this.debug) console.log('destroying offcanvas', this);

      this.close();
      $(window).off('toggleCanvas offCanvasResize');
      if (this.el.canvas) {
        $.each(this.el.canvas, $.proxy(function(index, el) {
          $(el).attr('canvas',false);
        }, this));
      }
      this.$offcanvas.css('height','');
      this.el.canvas[0].css('min-height','');
      this.$offcanvas.attr('alive',false);
    }
  };

  return $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$(this).data('form5-'+pluginName)) {
        return $(this).data('form5-'+pluginName, new $[pluginName](this, options));
      } else {
        var $form5Offcanvas = $(this).data('form5-'+pluginName);
        switch (options) {
          case 'open':
            $form5Offcanvas.open();
            break;
          case 'close':
            $form5Offcanvas.close();
            break;
          case 'destroy':
            $form5Offcanvas.destroy();
            $(this).removeData('form5-'+pluginName);
            break;
          default:
            $form5Offcanvas.toggle();
        }
      }
    });
  };
}).call(this);