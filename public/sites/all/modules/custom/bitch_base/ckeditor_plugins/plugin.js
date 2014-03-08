/*
 Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
 */

//CKEDITOR.plugins.add('image_caption',
//  {
//    beforeInit: function (editor) {
//      if (editor.config.contentsCss) {
//        if (!CKEDITOR.tools.isArray(editor.config.contentsCss))
//          editor.config.contentsCss = [ editor.config.contentsCss ];
//
//        editor.config.contentsCss.push(editor.config.captionfilter_css);
//      }
//    },
//    init: function (editor) {
//      CKEDITOR.on('dialogDefinition', function (e) {
//        if (e.data.name == 'image' && !e.data.definition.getContents('caption')) {
//          e.data.definition.addContents({
//            id: 'caption',
//            label: 'Caption',
//            title: 'Caption',
//            elements: [
//              {
//                type: 'text',
//                id: 'captionText',
//                label: 'Caption',
//                onHide: function () {
//                  this.enable();
//                },
//                setup: function (type, element) {
//                  if (type == 1) {
//                    var el = this.getDialog().cleanImageElement,
//                      parent = el && el.getAscendant('div'),
//                      caption;
//                    if (parent && ( caption = parent.getParent() ) && caption.is('div') && caption.hasClass('caption')) {
//                      var next = el.getNext(),
//                        bogus = el.getParent().getBogus();
//                      if (next) {
//                        this.setValue(next.getText());
//                        if (( next = next.getNext() ) && !next.equals(bogus))
//                          this.disable();
//                      }
//
//                      var select = this.getDialog().getContentElement('caption', 'captionStyle');
//                      select && select.setValue(caption.hasClass('caption-right') ? 'right' :
//                        caption.hasClass('caption-left') ? 'left' :
//                          caption.hasClass('caption-center') ? 'center' : '');
//
//                      this.captionElement = caption;
//                    }
//                  }
//                },
//                commit: function (type, element) {
//                  if (type == 1) {
//                    var caption = this.captionElement,
//                      sel = editor.getSelection(),
//                      selected = sel && sel.getSelectedElement();
//
//                    if (selected && !selected.is('img'))
//                      selected = null;
//
//                    if (!caption) {
//                      if (!this.getValue())
//                        return null;
//
//                      caption = CKEDITOR.dom.element.createFromHtml('<div class="caption"><div class="caption-inner"></div></div>', element.getDocument());
//                      if (this.linkElement) {
//                        caption.insertBefore(this.linkElement);
//                        this.linkElement.appendTo(caption.getFirst());
//                      }
//                      else {
//                        if (selected) {
//                          caption.insertBefore(selected);
//                          selected.move(caption.getFirst(), true);
//                        }
//                        else {
//                          editor.insertElement(caption);
//                          var imageElement = this.getDialog().imageElement;
//                          setTimeout(function () {
//                            imageElement.move(caption.getFirst(), true);
//                          }, 0);
//                        }
//                      }
//                    }
//
//                    if (this.isEnabled()) {
//                      if (!this.getValue()) {
//                        if (this.linkElement)
//                          this.linkElement.insertAfter(caption);
//                        else
//                          selected.insertAfter(caption);
//                        caption.remove();
//                      }
//                      else if (this.isChanged()) {
//                        var inner = caption.getFirst(),
//                          bogus = inner.getBogus();
//                        bogus && bogus.remove();
//                        if (inner.getLast() && inner.getLast().type == CKEDITOR.NODE_TEXT)
//                          inner.getLast().remove();
//                        if (CKEDITOR.env.ie && CKEDITOR.env.version < 8) {
//                          var dummy = new CKEDITOR.dom.element('span', element.getDocument());
//                          dummy.setText(this.getValue());
//                          dummy.moveChildren(inner);
//                          dummy.remove();
//                        }
//                        else
//                          inner.appendText(this.getValue());
//                      }
//                    }
//
//                    var select = this.getDialog().getContentElement('caption', 'captionStyle');
//                    if (select && ( !select.getValue() || !caption.hasClass('caption-' + select.getValue()) )) {
//                      caption.removeClass('caption-right');
//                      caption.removeClass('caption-left');
//                      caption.removeClass('caption-center');
//                      select.getValue() && caption.addClass('caption-' + select.getValue());
//                    }
//                  }
//                }
//              },
//              {
//                type: 'select',
//                id: 'captionStyle',
//                label: 'Style',
//                'default': '',
//                items: [
//                  [ '' ],
//                  [ 'Right', 'right' ],
//                  [ 'Left', 'left' ],
//                  [ 'Center', 'center' ]
//                ]
//              }
//            ]
//          });
//        }
//      });
//
//      var findCaption = function (element) {
//        var elementPath = new CKEDITOR.dom.elementPath(element),
//          asc = elementPath.blockLimit && elementPath.blockLimit.getAscendant('div', true);
//        while (asc && !asc.hasClass('caption'))
//          asc = asc.getAscendant('div');
//        return asc;
//      };
//
//      if (editor.addMenuItem) {
//        editor.addCommand('removecaption',
//          {
//            modes: { wysiwyg: 1 },
//            exec: function (editor) {
//              var sel = editor.getSelection(),
//                caption = sel && sel.getStartElement();
//              if (!caption || !( caption = findCaption(caption) ))
//                return null;
//              var inner = caption.getFirst(function (node) {
//                return node.type == CKEDITOR.NODE_ELEMENT && node.is('div') && node.hasClass('caption-inner');
//              });
//              caption.remove(true);
//              inner.getFirst(function (node) {
//                return node.type == CKEDITOR.NODE_ELEMENT && node.is('img');
//              }).clone().insertAfter(inner);
//              inner.remove();
//            }
//          });
//        editor.addMenuItem('removeCaption',
//          {
//            label: 'Remove Caption',
//            command: 'removecaption',
//            group: 'div',
//            order: 1
//          });
//        editor.contextMenu.addListener(function (element, selection) {
//          if (!element || element.isReadOnly())
//            return null;
//
//          if (findCaption(element))
//            return { removeCaption: CKEDITOR.TRISTATE_OFF };
//        });
//      }
//
//      if (editor.keystrokeHandler) {
//        var ks = editor.keystrokeHandler.keystrokes,
//          handler = ks[ 13 ];
//        editor.addCommand('captionEnter',
//          {
//            modes: { wysiwyg: 1 },
//            editorFocus: false,
//            exec: function (editor) {
//              var sel = editor.getSelection(),
//                caption = sel && sel.getStartElement(),
//                range = sel && sel.getRanges()[ 0 ];
//              if (caption && ( caption = findCaption(caption) )) {
//                CKEDITOR.env.ie && ( CKEDITOR.env.version < 9 ) && caption.getParent().focus();
//                range.moveToPosition(caption, CKEDITOR.POSITION_AFTER_END);
//                range.select();
//              }
//              return editor.execCommand(handler);
//            }
//          });
//        ks[ 13 ] = 'captionEnter';
//      }
//    },
//    afterInit: function (editor) {
//      var proto = CKEDITOR.htmlDataProcessor.prototype;
//      proto.toHtml = CKEDITOR.tools.override(proto.toHtml, function (org) {
//        return function (data) {
//          data = Drupal.captionFilter.toHTML(data, 'ckeditor');
//          return org.apply(this, arguments);
//        };
//      });
//      proto.toDataFormat = CKEDITOR.tools.override(proto.toDataFormat, function (org) {
//        return function (data) {
//          data = org.apply(this, arguments);
//          return Drupal.captionFilter.toTag(data);
//        };
//      });
//    }
//  });
