(function($) {
    
    var codes = {
        'KEY_OK'    : 13,
        'KEY_LEFT'  : 37,
        'KEY_UP'    : 38,
        'KEY_RIGHT' : 39,
        'KEY_DOWN'  : 40
    }
    var evento = null;
    
    $.fn.setFocus = function(e) {
        $('.sn-selected').removeClass('sn-selected');
           
        if ($(this).hasClass('field'))  {
            $(this).find('input').eq(0).focus().parents('.navigable').addClass('sn-selected');  
        }
        else if($(this).hasClass('actions') || $(this).hasClass('linkWrapper')) {
            $(this).find('a').focus().parents('.navigable').addClass('sn-selected');
        }
        else {        
            $(this).focus();
            switch($(this).attr('type')) {
                case 'text':
                    break;
                case 'submit':
                    $(this).addClass('sn-selected');
                    break;
                case 'button':
                    $(this).addClass('sn-selected');
                    break;
                case 'radio':
                    $(this).parents('.navigable').addClass('sn-selected');
                    break;
                default:
                    $(this).addClass('sn-selected');
            }
        }      
    }
    
    var methods = {
        
        init : function (exp, options) {   
            if (typeof(exp) == 'undefined')
                exp = '#body .navigable:first'; 
            $(exp).setFocus();
            
            $('a').bind('click', function() {
                window.location.href = this.href;
                return false;
            });
            
            return this.each(function() {     
                $(this).keydown( methods.doAction);
            })         
        },
        
        doAction: function(event) {
            evento = event;
            for ( var c in codes) {
                if (codes[c] == event.keyCode) {
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                }
            }

            var method = null;
            switch(event.keyCode) {
                case codes.KEY_OK:
                    $(this).data("keyok") == null ? methods.doOk() : eval('methods.'+$(this).data("keyok"));
                    break;
                case codes.KEY_DOWN:
                    method = eval('methods.'+$(this).data("keydown"));
                    break;
                case codes.KEY_UP:
                    method = eval('methods.'+$(this).data("keyup"));
                    break;
                case codes.KEY_LEFT:
                    method = eval('methods.'+$(this).data("keyleft"));
                    break;
                case codes.KEY_RIGHT:
                    method = eval('methods.'+$(this).data("keyright"));
                    break;
            }
        },
        
        doOk: function(exp) {
           exp ==null ? tgt = $(evento.target): tgt = $(exp);
           tgt.trigger('click');
        },
        
        goTo: function(exp) {
            $(exp).setFocus();           
        },
        
        
        /* 
         * AUXILIAR NAVIGATION METHODS
         */
        
        //nav next/prev inputs
        goNext: function(step) {
            if (step == null) step = 0;
            $(evento.target).closest('.navigable').nextAll('.navigable').eq(step).addClass('sn-selected').setFocus(evento);  
        },
        goPrev: function(step) {
            if (step == null) step = 0;
            $(evento.target).closest('.navigable').prevAll(".navigable").eq(step).addClass('sn-selected').setFocus(evento);
        },
         
        //nav next/prev up/down films in film-list
        goNextCover: function(exp) {
            $(evento.target).closest('li').next().find(".navigable").setFocus();           
        },
        goPrevCover: function(exp) {    
            $(evento.target).closest('li').prev().find(".navigable").setFocus();
        },    
        goDownCover: function(exp) {
            coverIndex = $(evento.target).closest('li').index();
            coverIndex+=7;
            $('#filmList .navigable ').eq(coverIndex).setFocus();
        },
        goUpCover: function(exp) {
            coverIndex = $(evento.target).closest('li').index();
            coverIndex-=7;
            $('#filmList .navigable ').eq(coverIndex).setFocus();
        },
        
    }
    
    $.fn.spatialNav = function (method) {
        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.spatialNav' );
            return false;
        }      
        
    }
})(jQuery);